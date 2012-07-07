#!/usr/bin/env node

var https = require('https'),
    fs = require('fs'),
    path = require('path'),
    args = process.argv.slice(2),
    argslen = args.length;
    

var imgur = (function () {

    var _req = null,
        _endpoint = '/2/upload.json?key=',
        _key = '',
        _keyloc = process.env.HOME + '/.imgurkey',
        _filetypes_allowed = 'jpg jpeg gif png apng tiff bmp pdf xcf'.split(' '),
        _regex_filetypes_allowed = new RegExp('(' + _filetypes_allowed.join('|') + ')', 'i');
        _request_options = {
                host: 'api.imgur.com',
                port: 443,
                path: '',
                method: 'POST',
                headers: {}
        };


    // Get saved API key (~/.imgurkey)
    function _getKey () {
        // Synchronous since nothing can happen without it
        if (!fs.existsSync(_keyloc)) {
            return false;
        }
        
        return fs.readFileSync(_keyloc, 'utf8').replace(/[\n\r\t\s]/gm, '');
    }
    
    
    // Set an API key
    function _setKey (key, persist) {
        if (!key) { return; }
        _key = key;
        exports.key = key;
        if (persist) {
            fs.writeFile(_keyloc, key, 'utf8', function (err) {
                if (err) {
                    throw err;
                }
            });
        }
    }
    
    
    // Open a file and return its contents and size
    // to a callback
    function _openFile (file, callback) {        
        fs.stat(file, function (err, stats) {
            if (err) {
                callback(err, null, 0);
                return;
            }
            
            fs.readFile(file, function (err, data) {
                callback(err, data, stats.size);
            });
        });
    }
    
    
    // Open a directory and return a list of files
    function _openDir (dir, callback) {        
        fs.readdir(dir, function (err, files) {
            callback(err, files);
        });
    }
    
    
    // Open a file or directory
    function _open (file_or_dir, callback) {
        if (!fs.existsSync(file_or_dir)) {
            console.error('imgur: Path not found (' + file_or_dir + ')');
            return;
        }
        
        if (!callback || typeof callback !== 'function') { 
            throw Error('_open: No callback function specified');
        }
        
        // Gather file/directory data
        fs.stat(file_or_dir, function (err, stats) {
            if (err) {
                callback(err, null, 0);
                return;
            }
            
            if (stats.isDirectory()) {
                _openDir(file_or_dir, function (err, files) {
                    if (err) {
                        callback(err, null, 0);
                        return;
                    }
                    
                    files.forEach(function (file) {
                        if (_regex_filetypes_allowed.test(path.extname(file))) {
                            _openFile(file, function (err, data, size) {
                                callback(err, data, size);
                            });   
                        }
                    });
                });
                   
            } else if (stats.isFile()) {
                
                _openFile(file_or_dir, function (err, data, size) {
                    callback(err, data, size);
                });
            }
            
        });
    }
    
    
    // Upload a single image
    function _upload (file, callback) {
        if (!callback || typeof callback !== 'function') { 
            throw Error('_upload: No callback function specified');
        }
        
        // Open file and upload
        _open(file, function (err, data, size) {
            _request_options.path = _endpoint + _key;
            _request_options.headers['Content-Length'] = size;

            _req = https.request(_request_options, function(res) {
                var body = '',
                    ratelimit = {
                        limit: null,
                        remaining: null,
                        reset: null
                    },
                    success = false;

                res.setEncoding('utf8');

                if (res.statusCode === 200) { success = true; }
                
                if (typeof res.headers['x-ratelimit-limit'] !== 'undefined') {
                    ratelimit.limit = res.headers['x-ratelimit-limit'];
                    ratelimit.remaining = res.headers['x-ratelimit-remaining'];
                    ratelimit.reset = res.headers['x-ratelimit-reset'];   
                }
                
                res.on('data', function (chunk) {
                    body += chunk;
                });

                res.on('end', function () {
                    if (!success) {
                        callback({
                            'success': false,
                            'error': JSON.parse(body).error.message,
                            'status_code': res.StatusCode || 'Unknown',
                            'rate': ratelimit,
                            'file': file,
                            'size': size,
                            'body': body
                        });
                        return;  
                    }
                    
                    callback({
                        'success': success,
                        'file': file,
                        'size': size,
                        'status_code': res.statusCode || 'Unknown',
                        'rate': ratelimit,
                        'links': JSON.parse(body).upload.links
                    });
                });
            });

            _req.on('error', function(e) {
                callback({
                    'success': false,
                    'file': file,
                    'size': size,
                    'error': e
                });
            }); 

            _req.write(data);

            _req.end(); 
        });
    }


    return { 
        'getKey': _getKey,
        'setKey': _setKey,
        'upload': _upload
    };
}());

exports.getKey = imgur.getKey;
exports.setKey = imgur.setKey;
exports.upload = imgur.upload;


// Upload files/directories specified on the command line
if (argslen) {
    var key = '',
        uploads_remaining = '',
        uploads_reset_time = '';
    
    // Check if key is being set via cli
    if (args[0] === '-k') {
        if (typeof args[1] === 'undefined') {
            console.log('Please specify a key, e.g: imgur -k <key>');
            return;
        }
        
        key = args[1] ;
        imgur.setKey(key, true);
        console.log('Key set to %s', key);
        return;
    }
    
    key = imgur.getKey();
    
    if (!key) {
        console.log('Please specify a key, e.g: imgur -k <key>\n\nIf you don\'t have one get one at get one at http://imgur.com/register/api_anon');
        return;
    }
    
    imgur.setKey(key);
    
    args.forEach(function (val, index, array) {        
        imgur.upload(val, function (response) {
            
            if (!response.success) {
                console.log('Failed to upload %s (%s)', response.file, response.error);
                
                if (typeof response.rate !== 'undefined') {
                    uploads_remaining = (response.rate.remaining / 10);   //
                    uploads_reset_time = new Date(response.rate.remaining * 1000);
                    console.log('\nUploads credits remaining: %s  (1 upload == 10 credits)', uploads_remaining);
                    console.log('Upload limit resets: %s\n', uploads_reset_time.toLocaleString());   
                }
                
                return;
            }
            
            uploads_remaining = response.rate.remaining;
            uploads_reset_time = response.rate.reset;
            
            console.log('%s --> %s', response.links.original, response.file);
            
            if (index === array.length-1) {
                uploads_remaining = (uploads_remaining / 10);   //
                uploads_reset_time = new Date(uploads_reset_time * 1000);
                console.log('\nUploads credits remaining: %s  (1 upload == 10 credits)', uploads_remaining);
                console.log('Upload limit resets: %s\n', uploads_reset_time.toLocaleString());
            }
        });
    });
}
