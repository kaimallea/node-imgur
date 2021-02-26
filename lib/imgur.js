'use strict';
var imgur = exports;
var got = require('got');
var Q = require('q');
var fs = require('fs');
var urlParser = require('url');
var glob = require('glob');
var FormData = require('form-data');

// The following client ID is tied to the
// registered 'node-imgur' app and is available
// here for public, anonymous usage via this node
// module only.
var IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID || 'f0ea04148a54268';
var IMGUR_API_URL = process.env.IMGUR_API_URL || 'https://api.imgur.com/3/';
var IMGUR_USERNAME = null;
var IMGUR_PASSWORD = null;
var IMGUR_ACCESS_TOKEN = null;
var IMGUR_MASHAPE_KEY = process.env.IMGUR_MASHAPE_KEY;

// An IIFE that returns the OS-specific home directory
// as a location to optionally store the imgur client id
var DEFAULT_CLIENT_ID_PATH = (function () {
  var envHome = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
  return process.env[envHome] + '/.imgur';
})();

imgur.VERSION = require('../package.json').version;

/**
 * Send a request to imgur's public API
 *
 * @param   {string}  operation - operation to perform; 'info' or 'upload'
 * @param   {mixed}   payload - image data
 * @returns {promise}
 */
imgur._imgurRequest = function (operation, payload, extraFormParams) {
  var deferred = Q.defer();
  var form = new FormData();
  var response = null;
  var options = {
    url: IMGUR_API_URL,
    method: null,
    encoding: 'utf8',
  };

  if (
    !operation ||
    typeof operation !== 'string' ||
    (!payload && operation !== ('credits' && 'search'))
  ) {
    deferred.reject(new Error('Invalid argument'));
    return deferred.promise;
  }

  switch (operation) {
    case 'upload':
      options.method = 'POST';
      options.url += 'image';
      break;
    case 'credits':
      options.method = 'GET';
      options.url += 'credits';
      break;
    case 'info':
      options.method = 'GET';
      options.url += 'image/' + payload;
      break;
    case 'album':
      options.method = 'GET';
      options.url += 'album/' + payload;
      break;
    case 'createAlbum':
      options.method = 'POST';
      options.url += 'album';
      break;
    case 'delete':
      options.method = 'DELETE';
      options.url += 'image/' + payload;
      break;
    case 'search':
      options.method = 'GET';
      options.url += '/gallery/search/' + payload;
      break;
    default:
      deferred.reject(new Error('Invalid operation'));
      return deferred.promise;
  }

  imgur
    ._getAuthorizationHeader()
    .then(async (authorizationHeader) => {
      if (IMGUR_MASHAPE_KEY) {
        options.headers = {
          Authorization: authorizationHeader,
          'X-Mashape-Key': IMGUR_MASHAPE_KEY,
        };
      } else {
        options.headers = {
          Authorization: authorizationHeader,
        };
      }

      if (operation === 'upload' || operation === 'update') {
        if (operation === 'upload') {
          form.append('image', payload);
        }

        if (typeof extraFormParams === 'object') {
          for (var param in extraFormParams) {
            form.append(param, extraFormParams[param]);
          }
        }

        options.body = form;
      }

      try {
        response = await got(options).json();
      } catch (err) {
        if (err) {
          return deferred.reject(err);
        }
      }

      if (response && !response.success) {
        deferred.reject({
          status: response.status,
          message: response.data ? response.error : 'No body data response',
        });
      } else {
        deferred.resolve(response.data);
      }
    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

/**
 * Make a request, handling potential errors
 *
 * @param {object} options
 * @returns {promise}
 */
imgur._request = function (options) {
  var deferred = Q.defer();

  (async () => {
    try {
      const response = await got(options).json();
      deferred.resolve(response);
    } catch (error) {
      deferred.reject(error);
    }
  })();

  return deferred.promise;
};

/**
 * Get imgur access token using credentials
 *
 * @returns {promise}
 */
imgur._getAuthorizationHeader = function () {
  var deferred = Q.defer();

  if (IMGUR_ACCESS_TOKEN) {
    deferred.resolve('Bearer ' + IMGUR_ACCESS_TOKEN);
  } else if (IMGUR_USERNAME && IMGUR_PASSWORD) {
    var options = {
      uri: 'https://api.imgur.com/oauth2/authorize',
      method: 'GET',
      encoding: 'utf8',
      searchParams: {
        client_id: IMGUR_CLIENT_ID,
        response_type: 'token',
      },
    };
    imgur
      ._request(options)
      .then(function (res) {
        var authorize_token = res.headers['set-cookie'][0].match(
          '(^|;)[s]*authorize_token=([^;]*)'
        )[2];
        options.method = 'POST';
        options.form = {
          username: IMGUR_USERNAME,
          password: IMGUR_PASSWORD,
          allow: authorize_token,
        };
        options.headers = {
          Cookie: 'authorize_token=' + authorize_token,
        };
        imgur
          ._request(options)
          .then(function (res) {
            var location = res.headers.location;
            var token = JSON.parse(
              '{"' +
                decodeURI(location.slice(location.indexOf('#') + 1))
                  .replace(/"/g, '\\"')
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"') +
                '"}'
            );
            IMGUR_ACCESS_TOKEN = token.access_token;
            deferred.resolve('Bearer ' + IMGUR_ACCESS_TOKEN);
          })
          .catch(function (err) {
            deferred.reject(err);
          });
      })
      .catch(function (err) {
        deferred.reject(err);
      });
  } else {
    deferred.resolve('Client-ID ' + IMGUR_CLIENT_ID);
  }

  return deferred.promise;
};

/**
 * Set your credentials
 * @link https://api.imgur.com/#register
 * @param {string} username
 * @param {string} password
 * @param {string} clientId
 */
imgur.setCredentials = function (username, password, clientId) {
  if (clientId && typeof clientId === 'string') {
    IMGUR_CLIENT_ID = clientId;
  }
  if (username && typeof username === 'string') {
    IMGUR_USERNAME = username;
  }
  if (password && typeof password === 'string') {
    IMGUR_PASSWORD = password;
  }
};

/**
 * Attempt to load the client ID from disk
 * @param   {string}  path - path to file with client id
 * @returns {promise}
 */
imgur.loadClientId = function (path) {
  var deferred = Q.defer();

  path = path || DEFAULT_CLIENT_ID_PATH;

  fs.readFile(path, { encoding: 'utf8' }, function (err, data) {
    if (err) {
      return deferred.reject(err);
    }

    if (!data) {
      deferred.reject(new Error('File is empty'));
      return deferred.promise;
    }

    return deferred.resolve(data);
  });

  return deferred.promise;
};

/**
 * Attempt to save the client ID to disk
 * @param   {string} path - path to save the client id to
 * @returns {promise}
 */
imgur.saveClientId = function (clientId, path) {
  var deferred = Q.defer();

  path = path || DEFAULT_CLIENT_ID_PATH;

  fs.writeFile(path, clientId, function (err) {
    if (err) {
      return deferred.reject(err);
    }

    return deferred.resolve();
  });

  return deferred.promise;
};

/**
 * Attempt to remove a saved client ID from disk
 * NOTE: File remains but is emptied
 *
 * @param   {string} path - path to save the client id to
 * @returns {promise}
 */
imgur.clearClientId = function (path) {
  return imgur.saveClientId('', path);
};

/**
 * Set your client ID
 * @link https://api.imgur.com/#register
 * @param {string} clientId
 */
imgur.setClientId = function (clientId) {
  if (clientId && typeof clientId === 'string') {
    IMGUR_CLIENT_ID = clientId;
  }
};

/**
 * Get currently set client ID
 * @returns {string} client ID
 */
imgur.getClientId = function () {
  return IMGUR_CLIENT_ID;
};

/**
 * Set Imgur API URL
 * @link https://api.imgur.com/#register or https://imgur-apiv3.p.mashape.com
 * @param {string} URL - URL to make the API calls to imgur
 */
imgur.setAPIUrl = function (URL) {
  if (URL && typeof URL === 'string') {
    IMGUR_API_URL = URL;
  }
};

/**
 * Get Imgur API Url
 * @returns {string} API Url
 */
imgur.getAPIUrl = function () {
  return IMGUR_API_URL;
};

/**
 * Set Mashape Key
 * @link https://market.mashape.com/imgur/imgur-9
 * @param {string} mashapeKey
 */
imgur.setMashapeKey = function (mashapeKey) {
  if (mashapeKey && typeof mashapeKey === 'string') {
    IMGUR_MASHAPE_KEY = mashapeKey;
  }
};
/**
 * Get Mashape Key
 * @returns {string} Mashape Key
 */
imgur.getMashapeKey = function () {
  return IMGUR_MASHAPE_KEY;
};

/**
 * Delete image
 * @param {string} deletehash - deletehash of the image generated during upload
 * @returns {promise}
 */
imgur.deleteImage = function (deletehash) {
  var deferred = Q.defer();

  if (!deletehash) {
    deferred.reject('Missing deletehash');
  }

  imgur
    ._imgurRequest('delete', deletehash)
    .then(function (json) {
      deferred.resolve(json);
    })
    .catch(function (err) {
      deferred.reject(err);
    });
  return deferred.promise;
};

/**
 * Get image metadata
 * @param   {string}  id - unique image id
 * @returns {promise}
 */
imgur.getInfo = function (id) {
  var deferred = Q.defer();

  if (!id) {
    deferred.reject('Invalid image ID');
    return deferred.promise;
  }

  imgur
    ._imgurRequest('info', id)
    .then(function (json) {
      deferred.resolve(json);
    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

/**
 * Create an album
 * @returns {promise}
 */
imgur.createAlbum = function () {
  var deferred = Q.defer();

  imgur
    ._imgurRequest('createAlbum', 'dummy')
    .then(function (json) {
      deferred.resolve(json);
    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

/**
 * Get album metadata
 * @param   {string}  id - unique album id
 * @returns {promise}
 */
imgur.getAlbumInfo = function (id) {
  var deferred = Q.defer();

  if (!id) {
    deferred.reject(new Error('Invalid album ID'));
    return deferred.promise;
  }

  imgur
    ._imgurRequest('album', id)
    .then(function (json) {
      deferred.resolve(json);
    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

imgur.search = function (query, options) {
  var deferred = Q.defer();
  var checkQuery = imgur.checkQuery(query);
  var params;
  options = options || {};
  if (checkQuery.constructor === Error) {
    deferred.reject(checkQuery);
  } else {
    params = imgur.initSearchParams(query, options);
    var queryStr = params.queryStr;
    delete params.queryStr;

    imgur
      ._imgurRequest('search', queryStr)
      .then(function (json) {
        deferred.resolve({ data: json.data, params });
      })
      .catch(function (err) {
        deferred.reject(err);
      });
  }

  return deferred.promise;
};

imgur.checkQuery = function (query) {
  var errMsg;
  if (!query) {
    errMsg = new Error(
      'Search requires a query. Try searching with a query (e.g cats).'
    );
  } else if (typeof query != 'string') {
    errMsg = new Error('You did not pass a string as a query.');
  } else {
    errMsg = '';
  }
  return errMsg;
};

imgur.initSearchParams = function (query, options) {
  var params = { sort: 'time', dateRange: 'all', page: '1' };

  for (var key in options) {
    if (key == 'sort' || key == 'dateRange' || key == 'page') {
      params[key] = params[key] != options[key] ? options[key] : params[key];
    }
  }

  var queryStr = '';
  Object.keys(params).forEach(function (param) {
    queryStr += '/' + params[param];
  });
  queryStr += '?q=' + query;
  params['queryStr'] = queryStr;
  return params;
};

/**
 * Upload an image file
 * @param   {string}  file - path to a binary image file
 * @param   {string=} albumId - the album id to upload to
 * @param   {string=} title - the title of the image
 * @param   {string=} description - the description of the image
 * @returns {promise}
 */
imgur.uploadFile = function (file, albumId, title, description) {
  var deferred = Q.defer(),
    extraFormParams = {};

  if (typeof albumId === 'string' && albumId.length) {
    extraFormParams.album = albumId;
  }

  if (typeof title === 'string' && title.length) {
    extraFormParams.title = title;
  }

  if (typeof description === 'string' && description.length) {
    extraFormParams.description = description;
  }

  glob(file, function (err, files) {
    if (err) {
      deferred.reject(err);
      return deferred.promise;
    } else if (!files.length) {
      deferred.reject(new Error('Invalid file or glob'));
      return deferred.promise;
    }

    files.forEach(function (f) {
      var readStream = fs.createReadStream(f);
      readStream.on('error', deferred.reject);

      imgur
        ._imgurRequest('upload', readStream, extraFormParams)
        .then(function (json) {
          deferred.resolve(json);
        })
        .catch(function (err) {
          deferred.reject(err);
        });
    });
  });

  return deferred.promise;
};

/**
 * Upload a url
 * @param   {string}  url - address to an image on the web
 * @param   {string=} albumId - the album id to upload to
 * @param   {string=} title - the title of the image
 * @param   {string=} description - the description of the image
 * @returns {promise}
 */
imgur.uploadUrl = function (url, albumId, title, description) {
  var deferred = Q.defer(),
    extraFormParams = {
      type: 'url',
    };

  if (typeof url === 'object') {
    extraFormParams.title = url.title;
    extraFormParams.description = url.description;
    extraFormParams.album = url.albumId;
    url = url.url;
  }

  if (typeof albumId === 'string' && albumId.length) {
    extraFormParams.album = albumId;
  }

  if (typeof title === 'string' && title.length) {
    extraFormParams.title = title;
  }

  if (typeof description === 'string' && description.length) {
    extraFormParams.description = description;
  }

  if (!url || !urlParser.parse(url).protocol) {
    deferred.reject(new Error('Invalid URL'));
    return deferred.promise;
  }

  imgur
    ._imgurRequest('upload', url, extraFormParams)
    .then(function (json) {
      deferred.resolve(json);
    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

/**
 * Upload a Base64-encoded string
 * @link http://en.wikipedia.org/wiki/Base64
 * @param   {string} base64 - a base-64 encoded string
 * @param   {string=} albumId - the album id to upload to
 * @param   {string=} title - the title of the image
 * @param   {string=} description - the description of the image
 * @returns {promise} - on resolve, returns the resulting image object from imgur
 */
imgur.uploadBase64 = function (base64, albumId, title, description) {
  var deferred = Q.defer(),
    extraFormParams = {};

  if (typeof albumId === 'string' && albumId.length) {
    extraFormParams.album = albumId;
  }

  if (typeof title === 'string' && title.length) {
    extraFormParams.title = title;
  }

  if (typeof description === 'string' && description.length) {
    extraFormParams.description = description;
  }

  if (typeof base64 !== 'string' || !base64 || !base64.length) {
    deferred.reject(new Error('Invalid Base64 input'));
    return deferred.promise;
  }

  imgur
    ._imgurRequest('upload', base64, extraFormParams)
    .then(function (image) {
      deferred.resolve(image);
    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};

/**
 * Upload an entire album of images
 * @param   {Array} images - array of image strings of desired type
 * @param   {string} uploadType - the type of the upload ('File', 'Url', 'Base64')
 * @param   {boolean=} failSafe - if true, it won't fail on invalid or empty image input and will return an object with empty album data and an empty image array
 * @returns {promise} - on resolve, returns an object with the album data and and an array of image data objects {data: {...}, images: [{...}, ...]}
 */
imgur.uploadAlbum = function (images, uploadType, failSafe) {
  var deferred = Q.defer();

  if (
    !images ||
    !images.length ||
    !(typeof images === 'string' || images instanceof Array)
  ) {
    if (failSafe) {
      deferred.resolve({ data: {}, images: [] });
    } else {
      deferred.reject(new Error('Invalid image input, only arrays supported'));
    }
    return deferred.promise;
  }

  imgur
    .createAlbum()
    .then(function (album) {
      imgur
        .uploadImages(images, uploadType, album.data.id)
        .then(function (images) {
          deferred.resolve({ data: album.data, images: images });
        })
        .catch(function (err) {
          return deferred.reject(err);
        });
    })
    .catch(function (err) {
      return deferred.reject(err);
    });

  return deferred.promise;
};

/**
 * Upload an entire album of images
 * @param {Array} images  - array of image strings of desired type
 * @param {string} uploadType - the type of the upload ('File', 'Url', 'Base64')
 * @param {string=} albumId - the album id to upload to
 * @returns {promise} - on resolve, returns an array of image data objects {album: {...}, images: [{...}, ...]}
 */
imgur.uploadImages = function (images, uploadType, albumId) {
  var deferred = Q.defer();
  var upload = imgur['upload' + uploadType];

  if (
    !images ||
    !images.length ||
    !(typeof images === 'string' || images instanceof Array)
  ) {
    deferred.reject(new Error('Invalid image input, only arrays supported'));
    return deferred.promise;
  }

  var results = [];
  var progress = 0;
  var done = images.length;
  for (var i = 0; i < done; i++) {
    upload(images[i], albumId)
      .then(function (image) {
        results.push(image.data);
        ++progress;
        if (progress == done) {
          deferred.resolve(results);
        }
      })
      .catch(function (err) {
        deferred.reject(err);
        return deferred.promise;
      });
  }

  return deferred.promise;
};

/**
 * Get current credit limits
 * @returns {promise}
 */
imgur.getCredits = function () {
  var deferred = Q.defer();

  imgur
    ._imgurRequest('credits')
    .then(function (json) {
      deferred.resolve(json);
    })
    .catch(function (err) {
      deferred.reject(err);
    });

  return deferred.promise;
};
