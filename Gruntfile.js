/*!
 * grunt-conkitty, https://github.com/hoho/grunt-conkitty
 * (c) 2013 Marat Abdullin, MIT license
 */

module.exports = function(grunt) {
    'use strict';

    grunt.minimatch = null;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            grunt: {
                src: ['Gruntfile.js', 'tasks/conkitty.js'],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },

        clean: {
            tmp: ['tmp']
        },

        conkitty: {
            ok: {
                src: ['test/tpl1.ctpl', 'test/tpl2.ctpl'],
                dest: {
                    common: 'tmp/ok.common',
                    templates: 'tmp/ok',
                    deps: 'tmp/ok.deps'
                }

            },
            empty: {
                src: ['test/tpl3.ctpl'],
                dest: {
                    common: 'tmp/empty.common',
                    templates: 'tmp/empty'
                }
            },
            nofile: {
                src: ['test/tpl1.ctpl', 'this/file/is/not/there', 'test/tpl2.ctpl'],
                dest: {
                    templates: 'tmp/nofile',
                    deps: 'tmp/nofile.deps'
                },
                nonull: true
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jshint', 'clean', 'conkitty']);
};
