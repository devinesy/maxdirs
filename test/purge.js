var maxdirs = require('../lib/maxdirs'),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    rimraf = require('rimraf');

module.exports = {
    testPurge: function (test) {
        var testRootDir = path.join(__dirname, 'out', 'purge');
        if (fs.existsSync(testRootDir)) {
            rimraf.sync(testRootDir);
        }
        if (!fs.existsSync(path.join(__dirname, 'out'))) {
            fs.mkdirSync(path.join(__dirname, 'out'));
        }
        fs.mkdirSync(testRootDir);
        for (var i = 1; i < 11; i++) {
            fs.mkdirSync(path.join(testRootDir, '' + i));
        }

        maxdirs.purge(testRootDir, 7, function (err, n) {
            if (err) {
                console.error('Error: ' + err.message);
                console.error(err.stack);
                test.fail(n, 0, 'Error: ' + err.message);
            }
            test.equal(n, 3);
            var count = 0;
            for (var i = 1; i < 11; i++) {
                count += (fs.existsSync(path.join(testRootDir, '' + i))) ? 1 : 0;
            }
            test.equal(count, 7);
            test.done();
        });
    }
};
