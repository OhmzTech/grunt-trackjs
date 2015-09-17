/*
 * grunt-trackjs
 * Outputs a custom TrackJS (www.trackjs.com) script containing initialization options and library
 *
 * Copyright (c) 2015 OhmzTech
 * Licensed under the MIT license.
 */

'use strict';

var stringify = require('node-stringify');

module.exports = function(grunt) {

    grunt.registerMultiTask("trackjs", "Integrate TrackJS services into a project", function () {

        // Require a config object
        this.requiresConfig(this.name);

        var done = this.async(),
            options = this.options() || {},
            outputfile = this.data.output;

        // Check requirements
        if (!this.data.token) {
            grunt.fail.warn('No token defined in settings, failed to include TrackJS.');
            return done(false);
        }
        if (!outputfile) {
            grunt.fail.warn('No JS file set to output script to, failed to include TrackJS.');
            return done(false);
        }

        // TrackJS option config
        var trackJsConfig = {
            token: this.data.token
        };
        for (var attr in options) {
            if (options.hasOwnProperty(attr)) {
                trackJsConfig[attr] = options[attr];
            }
        }

        // Write custom tracker script
        var writeOutputScript = function() {
            var trackJsOutput = 'window._trackJs = ' + stringify(trackJsConfig) + ';',
                source = grunt.file.read(require.resolve('trackjs'));
            if(source) {
                var result = grunt.file.write(outputfile, trackJsOutput + source);
                if(result) {
                    grunt.log.ok('Successfully wrote final output file.');
                    return done(true);
                } else {
                    grunt.fail.warn('Failed to write final output file.');
                }
            } else {
                grunt.fail.warn('Failed to read TrackJS source file, failed to include TrackJS.');
            }
        };

        // Get GIT version number
        if(this.data.gitversion) {
            grunt.util.spawn({
                cmd: "git",
                args: ["describe", "--tags", "--always", "--long"]
            }, function (err, result) {
                if (err) {
                    grunt.verbose.warn(err);
                    grunt.log.warn('Failed to retrieve git version - ignoring version config');
                } else {
                    trackJsConfig.version = result.stdout;
                }
                writeOutputScript();
            });
        } else {
            writeOutputScript();
        }

    });

};
