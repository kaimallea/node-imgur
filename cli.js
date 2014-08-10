#!/usr/bin/env node
var imgur     = require('./lib/imgur.js');
var commander = require('commander');

function collect (val, arr) {
    arr.push(val);
    return arr;
}

commander
    .version(imgur.VERSION)
    .option('-i, --info [id ...]', 'Lookup images by ID', collect, [])
    .option('-b, --base64 [string ...]', 'Upload a base64-encoded images', collect, [])
    .option('-u, --url [url ...]', 'Upload URLs', collect, [])
    .option('-f, --file [file ...]', 'Upload binary image files', collect, [])
    .parse(process.argv);

if (commander.file) {
    commander.file.forEach(function(file, index, array) {
        imgur.uploadFile(file)
            .then(function (json) {
                var output;
                if (commander.file.length > 1) {
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

if (commander.info) {
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

if (commander.base64) {
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

if (commander.url) {
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