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
var IMGUR_CLIENT_ID = 'f0ea04148a54268';
var IMGUR_API_URL   = 'https://api.imgur.com/3/';

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
        json:     true,
        headers:  {
            'Authorization': 'Client-ID ' + IMGUR_CLIENT_ID
        }
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
    };

    var r = request(options, function (err, res, body) {
        if (err) {
            deferred.reject(err);
        } else if (res.statusCode !== 200) {
            err = new Error(res.statusCode + ' - ' + body.data.error);
            deferred.reject(err);
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

    return deferred.promise;
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
            return deferred.reject(new Error('File is empty'))
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
        deferred.reject(new Error('Invalid image ID'));
        return deferred.promise;
    }

    imgur._imgurRequest('info', id)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (error) {
            deferred.reject(error);
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
        .catch(function (error) {
            deferred.reject(error);
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
        .catch(function (error) {
            deferred.reject(error);
        });

    return deferred.promise;
}


/**
 * Upload an image file
 * @param   {string}  file - path to a binary image file
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
            return deferred.reject(err);
        } else if (!files.length) {
            return deferred.reject(new Error('Invalid file or glob'));
        }

        files.forEach(function (f, index, arr) {
            var readStream = fs.createReadStream(f);
            readStream.on('error', deferred.reject);

            imgur._imgurRequest('upload', readStream, extraFormParams)
                .then(function (json) {
                    deferred.resolve(json);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
        });
    });

    return deferred.promise;
}


/**
 * Upload a url
 * @param   {string}  url - address to an image on the web
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

    imgur._imgurRequest('upload', url)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (error) {
            deferred.reject(error);
        });

    return deferred.promise;
}


/**
 * Upload a Base64-encoded string
 * @link http://en.wikipedia.org/wiki/Base64
 * @param   {string}  str - a base-64 encoded string
 * @returns {promise}
 */
imgur.uploadBase64 = function (str, albumId) {
    var deferred = Q.defer(),
        extraFormParams = {};

    if (typeof albumId === 'string' && albumId.length) {
        extraFormParams.album = albumId;
    }

    if (!str || !str.length) {
        deferred.reject(new Error('Invalid Base64 string'));
        return deferred.promise;
    }

    imgur._imgurRequest('upload', str, extraFormParams)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (error) {
            deferred.reject(error);
        });

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
        .catch(function (error) {
            deferred.reject(error);
        });

    return deferred.promise;
}
