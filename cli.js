#!/usr/bin/env node
'use strict'

var imgur     = require('./lib/imgur.js');
var commander = require('commander');
var util      = require('util');

// Used to collect args for specific options
function collect (val, arr) {
    arr.push(val);
    return arr;
}

commander
    .version(imgur.VERSION)
    .option('-i, --info [id]', 'Lookup images by ID', collect, [])
    .option('-b, --base64 [string]', 'Upload a base64-encoded images', collect, [])
    .option('-u, --url [url]', 'Upload URLs', collect, [])
    .option('-f, --file [file ...]', 'Upload binary image files', collect, [])
    .parse(process.argv);

if (commander.info.length) {
    commander.info.forEach(function(id, index, array) {
        imgur.info(id)
            .then(function (json) {
                console.log(json.data);
            })
            .catch(function (err) {
                console.error(err.message);
            });
    });
}


if (commander.url.length) {
    commander.url.forEach(function(url, index, array) {
        imgur.uploadUrl(url)
            .then(function (json) {
                var output;
                if (commander.url.length > 1) {
                    output = util.format('%s -> %s', url, json.data.link);
                } else {
                    output = json.data.link;
                }
                console.log(output);
            })
            .catch(function (err) {
                console.error(err.message);
            });
    });
}


if (commander.base64.length) {
    commander.base64.forEach(function(str, index, array) {
        imgur.uploadBase64(str)
            .then(function (json) {
                var output;
                if (commander.base64.length > 1) {
                    output = util.format('%s... -> %s', str.substr(0, 7), json.data.link);
                } else {
                    output = json.data.link;
                }
                console.log(output);
            })
            .catch(function (err) {
                console.error(err.message);
            });
    });
}


if (commander.file.length || commander.args.length) {
    var args = commander.file.concat(commander.args);
    args.forEach(function(file, index, array) {
        imgur.uploadFile(file)
            .then(function (json) {
                var output;
                if (args.length > 1) {
                    output = util.format('%s -> %s', file, json.data.link);
                } else {
                    output = json.data.link;
                }
                console.log(output);
            })
            .catch(function (err) {
                console.error(err.message);
            });
    });
}