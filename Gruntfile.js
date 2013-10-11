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
            concatizeTemplates: ['tmp']
        },

        conkitty: {
            ok: {
                files: {
                    'tmp/ok': ['test/tpl1.ctpl', 'test/tpl2.ctpl']
                }
            },
            empty: {
                files: {
                    'tmp/empty': ['test/tpl3.ctpl']
                }
            },
            nofile: {
                src: ['test/tpl1.ctpl', 'this/file/is/not/there', 'test/tpl2.ctpl'],
                dest: 'tmp/nofile',
                nonull: true
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jshint', 'clean', 'conkitty']);
};
