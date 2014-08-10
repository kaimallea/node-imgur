var VERSION = '0.1.0';

// The following client ID is tied to the
// registered 'node-imgur' app and is available
// here for public, anonymous usage via this node
// module only.
var IMGUR_CLIENT_ID = 'f0ea04148a54268';
var IMGUR_API_URL   = 'https://api.imgur.com/3/';

var request   = require('request');
var Q         = require('q');
var fs        = require('fs');
var urlParser = require('url');
var glob      = require('glob');

/**
 * Send a request to imgur's public API
 *
 * @param   {string} type - can be 'info' or 'upload'
 * @param   {mixed}  payload - image data
 * @returns {promise}
 */
function _imgurRequest (type, payload) {
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

    switch(type) {
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
 * Get image metadata
 * @param   {string}  id
 * @returns {promise}
 */
function _info (id) {
    var deferred = Q.defer();

    if (!id) {
        return deferred.reject(new Error('Invalid image ID'));
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
 * @param   {string}  path to file
 * @returns {promise}
 */
function _uploadFile (file) {
    var deferred = Q.defer();

    glob(file, function (err, files) {
        if (err) {
            return deferred.reject(err);
        } else if (!files.length) {
            return deferred.reject(new Error('No files to upload'));
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
 * @param   {string}  url
 * @returns {promise}
 */
function _uploadUrl (url) {
    var deferred = Q.defer();

    if (!url || !urlParser.parse(url).protocol) {
        return deferred.reject(new Error('Invalid URL'));
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
 * @param   {string}  encoded string
 * @returns {promise}
 */
function _uploadBase64 (str) {
    var deferred = Q.defer();

    if (!str || !str.length) {
        return deferred.reject(new Error('Invalid Base64 string'));
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

exports.VERSION = VERSION;
exports.info = _info;
exports.uploadFile = _uploadFile;
exports.uploadUrl = _uploadUrl;
exports.uploadBase64 = _uploadBase64;