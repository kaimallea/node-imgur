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


imgur.VERSION = require('../package.json').version;

/**
 * Send a request to imgur's public API
 *
 * @param   {string}  operation - operation to perform; 'info' or 'upload'
 * @param   {mixed}   payload - image data
 * @returns {promise}
 */
imgur._imgurRequest = function (operation, payload) {
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

    if (!operation || typeof operation !== 'string' || !payload) {
        deferred.reject(new Error('Invalid argument'));
        return deferred.promise;
    }

    switch(operation) {
        case 'info':
            options.method = 'GET';
            options.uri += 'image/' + payload;
            break;
        case 'upload':
            options.method = 'POST';
            options.uri += 'image';
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

    form = r.form();
    form.append('image', payload);

    return deferred.promise;
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

    _imgurRequest('info', id)
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
imgur.uploadFile = function (file) {
    var deferred = Q.defer();

    glob(file, function (err, files) {
        if (err) {
            deferred.reject(err);
            return deferred.promise;
        } else if (!files.length) {
            deferred.reject(new Error('No files to upload'));
            return deferred.promise;
        }

        files.forEach(function(f, index, arr) {
            var readStream = fs.createReadStream(f);
            readStream.on('error', deferred.reject);

            _imgurRequest('upload', readStream)
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
imgur.uploadUrl = function (url) {
    var deferred = Q.defer();

    if (!url || !urlParser.parse(url).protocol) {
        deferred.reject(new Error('Invalid URL'));
        return deferred.promise;
    }

    _imgurRequest('upload', readStream)
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
imgur.uploadBase64 = function (str) {
    var deferred = Q.defer();

    if (!str || !str.length) {
        deferred.reject(new Error('Invalid Base64 string'));
        return deferred.promise;
    }

    _imgurRequest('upload', str)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (error) {
            deferred.reject(error);
        });

    return deferred.promise;
}
