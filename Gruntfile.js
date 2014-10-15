/*!
 * grunt-conkitty, https://github.com/hoho/grunt-conkitty
 * (c) 2013 Marat Abdullin, MIT license
 */

module.exports = function(grunt) {
    'use strict';

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
                    deps: 'tmp/ok.deps',
                    sourcemap: 'tmp/ok.map',
                    libs: [{BASE: './test/lib', FILES: ['lib.ctpl']}]
                }

            },
            ok2: {
                src: ['test/tpl1.ctpl', 'test/tpl2.ctpl'],
                dest: {
                    common: {file: 'tmp/ok2.common', 'concat.js': false},
                    templates: 'tmp/ok2',
                    deps: 'tmp/ok2.deps',
                    sourcemap: 'tmp/ok2.map',
                    libs: [{BASE: './test/lib', FILES: ['lib.ctpl']}]
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
            },
            precompileExpr: {
                src: ['test/tpl4.ctpl'],
                dest: {
                    env: {prop1: 111, prop2: 'dark', prop3: true},
                    templates: 'tmp/pce',
                    deps: 'tmp/pce.deps'
                }
            },
            depslist: {
                src: ['test/tpl1.ctpl', 'test/tpl2.ctpl'],
                dest: {
                    templates: 'tmp/depslist',
                    deps: {
                        dest: 'tmp/depslist.deps',
                        file: 'tmp/depslist.json'
                    },
                    libs: [{BASE: './test/lib', FILES: ['lib.ctpl']}]
                }

            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jshint', 'clean', 'conkitty']);
};
