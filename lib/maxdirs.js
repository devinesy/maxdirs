"use strict";

var fs = require('fs'),
path = require('path'),
rimraf = require('rimraf');

module.exports.purge = function(rootDir, maxSubDirs, callback) {
    maxSubDirs = maxSubDirs < 0 ? 0 : maxSubDirs;
    var subdirs = [];
    fs.readdir(rootDir, function(err, files) {
        if (err) {
            callack(err);
            return;
        }
        files.forEach(function(f) {
            var fpath = path.join(rootDir, f);
            try {
                var stats = fs.statSync(fpath);
                if (stats.isDirectory()) {
                    subdirs.push({dir: fpath, mtime: stats.mtime});
                }
            } catch (e) {
                // could not get stats, continue
            }
        });
        var nToDelete = subdirs.length - maxSubDirs;
        if (nToDelete < 1) {
            callback(null, 0);
            return;
        }
        subdirs.sort(function(b1, b2) {
            var diff = b1.mtime - b2.mtime;
            return (diff === 0) ? 0 : (diff > 0 ? +1 : -1);
        });
        for (var i = 0; i < nToDelete; i++) {
            var sd = subdirs[i];
            rimraf.sync(sd.dir);
        }
        callback(null, nToDelete);
    });
};
