'use strict'
var imgur     = exports;
var request   = require('request');
var Q         = require('q');
var fs        = require('fs');
var urlParser = require('url');
var glob      = require('glob');

// The following client ID is tied to the
// registered 'node-imgur' app and is available
// here for public, anonymous usage via this node
// module only.
var IMGUR_CLIENT_ID    = 'f0ea04148a54268';
var IMGUR_API_URL      = 'https://api.imgur.com/3/';
var IMGUR_USERNAME     = null;
var IMGUR_PASSWORD     = null;
var IMGUR_ACCESS_TOKEN = null;

// An IIFE that returns the OS-specific home directory
// as a location to optionally store the imgur client id
var DEFAULT_CLIENT_ID_PATH = (function() {
    var envHome = (process.platform === 'win32') ? 'USERPROFILE' : 'HOME'
    return process.env[envHome] + '/.imgur';
}());

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
    var form     = null;
    var options  = {
        uri:      IMGUR_API_URL,
        method:   null,
        encoding: 'utf8',
        json:     true
    };

    if (!operation || typeof operation !== 'string' || (!payload && operation !== 'credits')) {
        deferred.reject(new Error('Invalid argument'));
        return deferred.promise;
    }

    switch(operation) {
        case 'upload':
            options.method = 'POST';
            options.uri += 'image';
            break;
        case 'credits':
            options.method = 'GET';
            options.uri += 'credits';
            break;
        case 'info':
            options.method = 'GET';
            options.uri += 'image/' + payload;
            break;
        case 'album':
            options.method = 'GET';
            options.uri += 'album/' + payload;
            break;
        case 'createAlbum':
            options.method = 'POST';
            options.uri += 'album';
            break;
        default:
            deferred.reject(new Error('Invalid operation'));
            return deferred.promise;
    }

    imgur._getAuthorizationHeader()
        .then(function (authorizationHeader) {
            options.headers = {
                Authorization: authorizationHeader
            };

            var r = request(options, function (err, res, body) {
                if (err) {
                    deferred.reject(err);
                } else if (!body.success) {
                    deferred.reject({status: body.status, message: body.data.error});
                } else {
                    deferred.resolve(body);
                }
            });

            if (operation === 'upload') {
                form = r.form();
                form.append('image', payload);

                if (typeof extraFormParams === 'object') {
                    for (var param in extraFormParams) {
                        form.append(param, extraFormParams[param]);
                    }
                }
            }
        })
        .catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}

/**
 * Make a request, handling potential errors
 *
 * @param {object} options
 * @returns {promise}
 */
imgur._request = function (options) {
    var deferred = Q.defer();

    request(options, function (err, res, body) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(res);
        }
    });

    return deferred.promise;
}

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
            uri:      'https://api.imgur.com/oauth2/authorize',
            method:   'GET',
            encoding: 'utf8',
            qs: {
                client_id: IMGUR_CLIENT_ID,
                response_type: 'token'
            }
        };
        imgur._request(options).then(function (res) {
            var authorize_token = res.headers['set-cookie'][0].match('(^|;)[\s]*authorize_token=([^;]*)')[2];
            options.method = 'POST';
            options.json = true;
            options.form = {
                username: IMGUR_USERNAME,
                password: IMGUR_PASSWORD,
                allow: authorize_token
            };
            options.headers = {
                Cookie: 'authorize_token=' + authorize_token
            };
            imgur._request(options).then(function (res) {
                var location = res.headers.location;
                var token = JSON.parse('{"' + decodeURI(location.slice(location.indexOf('#') + 1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                IMGUR_ACCESS_TOKEN = token.access_token;
                deferred.resolve('Bearer ' + IMGUR_ACCESS_TOKEN);
            }).catch(function (err) {
                deferred.reject(err);
            });
        }).catch(function (err) {
            deferred.reject(err);
        });
    } else {
        deferred.resolve('Client-ID ' + IMGUR_CLIENT_ID);
    }

    return deferred.promise;
}

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
}


/**
 * Attempt to load the client ID from disk
 * @param   {string}  path - path to file with client id
 * @returns {promise}
 */
imgur.loadClientId = function (path) {
    var deferred = Q.defer();
    var clientId = null;

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
}


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
}


/**
 * Attempt to remove a saved client ID from disk
 * NOTE: File remains but is emptied
 *
 * @param   {string} path - path to save the client id to
 * @returns {promise}
 */
imgur.clearClientId = function (path) {
    return imgur.saveClientId('', path);
}


/**
 * Set your client ID
 * @link https://api.imgur.com/#register
 * @param {string} clientId
 */
imgur.setClientId = function (clientId) {
    if (clientId && typeof clientId === 'string') {
        IMGUR_CLIENT_ID = clientId;
    }
}


/**
 * Get currently set client ID
 * @returns {string} client ID
 */
imgur.getClientId = function () {
    return IMGUR_CLIENT_ID;
}


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

    imgur._imgurRequest('info', id)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}


/**
 * Create an album
 * @returns {promise}
 */
imgur.createAlbum = function () {
    var deferred = Q.defer();

    imgur._imgurRequest('createAlbum', 'dummy')
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}


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

    imgur._imgurRequest('album', id)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}


/**
 * Upload an image file
 * @param   {string}  file - path to a binary image file
 * @param   {string=} albumId - the album id to upload to
 * @returns {promise}
 */
imgur.uploadFile = function (file, albumId) {
    var deferred = Q.defer(),
        extraFormParams = {};

    if (typeof albumId === 'string' && albumId.length) {
        extraFormParams.album = albumId;
    }

    glob(file, function (err, files) {
        if (err) {
            deferred.reject(err);
            return deferred.promise;
        } else if (!files.length) {
            deferred.reject(new Error('Invalid file or glob'));
            return deferred.promise;
        }

        files.forEach(function (f, index, arr) {
            var readStream = fs.createReadStream(f);
            readStream.on('error', deferred.reject);

            imgur._imgurRequest('upload', readStream, extraFormParams)
                .then(function (json) {
                    deferred.resolve(json);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });
        });
    });

    return deferred.promise;
}


/**
 * Upload a url
 * @param   {string}  url - address to an image on the web
 * @param   {string=} albumId - the album id to upload to
 * @returns {promise}
 */
imgur.uploadUrl = function (url, albumId) {
    var deferred = Q.defer(),
        extraFormParams = {};

    if (typeof albumId === 'string' && albumId.length) {
        extraFormParams.album = albumId;
    }

    if (!url || !urlParser.parse(url).protocol) {
        deferred.reject(new Error('Invalid URL'));
        return deferred.promise;
    }

    imgur._imgurRequest('upload', url, extraFormParams)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}


/**
 * Upload a Base64-encoded string
 * @link http://en.wikipedia.org/wiki/Base64
 * @param   {string} base64 - a base-64 encoded string
 * @param   {string=} albumId - the album id to upload to
 * @returns {promise} - on resolve, returns the resulting image object from imgur
 */
imgur.uploadBase64 = function (base64, albumId) {
    var
        deferred = Q.defer(),
        extraFormParams = {};

    if (typeof albumId === 'string' && albumId.length) {
        extraFormParams.album = albumId;
    }

    if (typeof base64 !== 'string' || !base64 || !base64.length) {
        deferred.reject(new Error('Invalid Base64 input'));
        return deferred.promise;
    }

    imgur._imgurRequest('upload', base64, extraFormParams)
        .then(function (image) {
            deferred.resolve(image);
        })
        .catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}

/**
 * Upload an entire album of images
 * @param   {Array} images - array of image strings of desired type
 * @param   {string} uploadType - the type of the upload ('File', 'Url', 'Base64')
 * @param   {boolean=} failSafe - if true, it won't fail on invalid or empty image input and will return an object with empty album data and an empty image array
 * @returns {promise} - on resolve, returns an object with the album data and and an array of image data objects {data: {...}, images: [{...}, ...]}
 */
imgur.uploadAlbum = function (images, uploadType, failSafe) {
    var deferred = Q.defer();

    if (!images || !images.length || !(typeof images === 'string' || images instanceof Array)) {
        if (failSafe) {
            deferred.resolve({data: {}, images: []});
        } else {
            deferred.reject(new Error('Invalid image input, only arrays supported'));
        }
        return deferred.promise;
    }

    imgur.createAlbum()
        .then(function(album) {
            imgur.uploadImages(images, uploadType, album.data.id)
                .then(function (images) {
                    deferred.resolve({data: album.data, images: images});
                })
                .catch(function (err) {
                    return deferred.reject(err);
                });
        })
        .catch(function (err) {
            return deferred.reject(err);
        });

    return deferred.promise;
}

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

    if (!images || !images.length || !(typeof images === 'string' || images instanceof Array)) {
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
}


/**
 * Get current credit limits
 * @returns {promise}
 */
imgur.getCredits = function () {
    var deferred = Q.defer();

    imgur._imgurRequest('credits')
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}
