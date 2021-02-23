#!/usr/bin/env node
'use strict'
var imgur     = require('./lib/imgur');
var commander = require('commander');
var Q         = require('q');
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
    .option('-c, --client-id [id]', 'Specify a client ID to use only for the current operation')
    .option('-a, --album-id [id]', 'Specify an album ID to upload images to')
    .option('--credits', 'Get information about remaining credits')
    .option('--save [id]', 'Save client id to disk for future use')
    .option('--clear', 'Remove previously saved client id')
    .option('--show', 'Display saved client id')
    .parse(process.argv);


// @TODO: There's probably a more promisey/chainy way to make this more succinct

imgur.loadClientId()
    .then(imgur.setClientId)
    .fin(function () {
        if (commander.clientId) {
            imgur.setClientId(commander.clientId);
        }

        if (commander.show) {

            console.log(imgur.getClientId());

        } else if (commander.clear) {

            imgur.clearClientId()
                .fail(function (err) {
                    console.error('Unable to clear client id (%s)', err.message);
                });

        } else if (commander.save) {

            imgur.saveClientId(commander.save)
                .fail(function (err) {
                    console.error('Unable to save client id (%s)', err.message);
                });

        } else if (commander.credits) {

            imgur.getCredits()
                .then(function (json) {
                    console.log(json.data);
                }, function (err) {
                    console.error('Unable to get credit info (%s)', err.message);
                });

        } else {

            if (commander.file.length || commander.args.length) {
                var args = commander.file.concat(commander.args);
                var albumId = commander.albumId ? commander.albumId : null;
                if (!albumId && args.length > 1) {
                    var aId, deleteHash;
                    imgur.createAlbum()
                        .then(function (json) {
                            aId = json.data.id;
                            deleteHash = json.data.deletehash;
                            console.log('Album -> https://imgur.com/a/%s', aId);
                            args.forEach(function(file, index, array) {
                                imgur.uploadFile(file, deleteHash)
                                    .then(function (json) {
                                        var output = util.format('%s -> %s', file, json.data.link);
                                        console.log(output);
                                    }, function (err) {
                                        console.error('%s (%s)', err.message, file);
                                    });
                            });
                        }, function (err) {
                            console.error('Unable to create album (%s)', err.message);
                        });
                } else {
                    args.forEach(function(file, index, array) {
                        imgur.uploadFile(file, albumId)
                            .then(function (json) {
                                var output;
                                if (args.length > 1) {
                                    output = util.format('%s -> %s', file, json.data.link);
                                } else {
                                    output = json.data.link;
                                }
                                console.log(output);
                            }, function (err) {
                                console.error('%s (%s)', err.message, file);
                            });
                    });
                }
            }

            if (commander.info.length) {
                commander.info.forEach(function (id, index, array) {
                    imgur.getInfo(id)
                        .then(function (json) {
                            console.log(json.data);
                        }, function (err) { console.log(err.message); });
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
                        }, function (err) {
                            var output = util.format('%s (%s...)', err.message, str.substr(0, 7));
                            console.error(output);
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
                        }, function (err) {
                            console.error('%s (%s)', err.message, url);
                        });
                });
            }
        }
    });
