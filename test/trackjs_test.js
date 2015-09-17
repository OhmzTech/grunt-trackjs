'use strict';

var grunt = require('grunt');

exports.trackjs = {
    setUp: function (done) {
        done();
    },
    custom_options: function (test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/custom_options');
        var expected = grunt.file.read('test/expected/custom_options');
        test.equal(actual, expected, 'Output file should be compiled');
        test.done();
    },
    method_options: function (test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/method_options');
        var expected = grunt.file.read('test/expected/method_options');
        test.equal(actual, expected, 'Output file should be compiled');
        test.done();
    }
};
