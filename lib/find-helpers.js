'use strict';

var _ = require('lodash'),
    glob = require('glob');

module.exports = {
    getHelperPaths: function (appRoot, paths, options) {
        var patterns = options.patterns || [];
        var defaultPatterns = ['/**/*.hbs.js'];
        patterns = _.uniq(patterns.concat(defaultPatterns));

        var helperPaths = [];

        if (options.log) {
            console.log('\nLooking for handlebars helpers in the following locations: \n%s', paths.join('\n'));
        }

        paths.forEach(function (helperPath) {
            patterns.forEach(function (pattern) {
                helperPaths = helperPaths.concat(glob.sync(appRoot + helperPath + pattern));
            });
        });

        if (options.log) {
            console.log('\nFound %d helper files', helperPaths.length);

            console.log('\n***** LIST OF HELPER PATHS *****');
            console.log(helperPaths.join('\n'));
        }

        return helperPaths;
    },
    getHelperFunctions: function (helperPaths, options) {
        var helpers = helperPaths.reduce(function (prev, path) {
            var helper = require(path);
            for(var prop in helper){
                if(!helper.hasOwnProperty(prop)){
                    continue;
                }
                if(prev[prop] === 'function'){
                    continue;
                }
                if(typeof helper[prop] === 'function'){
                    prev[prop] = helper[prop];
                }
            }
            return prev;
        }, {});

        if (options.log) {
            console.log('\n***** LIST OF HELPER FUNCTIONS *****');
            console.log(Object.keys(helpers).join('\n'));
        }

        return helpers;
    }
};

