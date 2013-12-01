/*!
 * grunt-conkitty, https://github.com/hoho/grunt-conkitty
 * (c) 2013 Marat Abdullin, MIT license
 */

'use strict';

module.exports = function(grunt) {
    var conkittyCompile = require('conkitty');

    grunt.registerMultiTask('conkitty', 'Compile Conkitty templates.', function() {
        this.files.forEach(function(f) {
            var ret = {},
                tplName,
                code;

            f.src
                .filter(function(filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                })
                .map(function(filepath) {
                    grunt.log.writeln('Compiling "' + filepath + '"');

                    var src = grunt.file.read(filepath),
                        compiled = conkittyCompile(src),
                        tplName;

                    for (tplName in compiled) {
                        ret[tplName] = compiled[tplName];
                    }
                });

            if (Object.keys(ret).length) {
                code = ['if (!$C.tpl) { $C.tpl = {}; }\n'];

                for (tplName in ret) {
                    code.push('$C.tpl[\'' + tplName + '\'] = ' + ret[tplName] + '\n');
                }

                grunt.file.write(f.dest, code.join('\n'));
                grunt.log.writeln('File "' + f.dest + '" created.');
            } else {
                grunt.log.warn('No compiled templates.');
            }
        });
    });

};
