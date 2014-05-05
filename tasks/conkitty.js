/*!
 * grunt-conkitty, https://github.com/hoho/grunt-conkitty
 * (c) 2013 Marat Abdullin, MIT license
 */

'use strict';


function zeroPad(cur, max) {
    var zeros = Math.floor(max / 10),
        ret = [];

    while (zeros > 0) {
        zeros = Math.floor(zeros / 10);
        ret.push('0');
    }

    ret.push(cur + '');
    return ret.join('');
}


module.exports = function(grunt) {
    var Conkitty = require('conkitty'),
        path = require('path');

    grunt.registerMultiTask('conkitty', 'Compile Conkitty templates.', function() {
        this.files.forEach(function(f) {
            var conkitty = new Conkitty(),
                dest,
                data,
                filesCreated,
                i,
                filename,
                newfilename;

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
                .map(function(filename) {
                    grunt.log.writeln('Reading "' + filename + '"');
                    conkitty.push(filename);
                });

            grunt.log.writeln('Compiling templates...');
            conkitty.generate();
            grunt.log.writeln('Compiled.');

            if ((dest = f.dest)) {
                data = conkitty.getCommonCode();
                if (data && dest.common) {
                    grunt.file.write(dest.common, data);
                    filesCreated = true;
                    grunt.log.writeln('File "' + dest.common + '" created (common).');
                }

                data = conkitty.getTemplatesCode();
                if (data && dest.templates) {
                    grunt.file.write(dest.templates, data);
                    filesCreated = true;
                    grunt.log.writeln('File "' + dest.templates + '" created (templates).');
                }

                if (!filesCreated) {
                    grunt.log.warn('Neither common nor templates file created.');
                }

                data = conkitty.getIncludes();
                if (data && data.length && dest.deps) {
                    grunt.file.mkdir(dest.deps);
                    for (i = 0; i < data.length; i++) {
                        filename = data[i];
                        newfilename = zeroPad(i + 1, data.length) + '_' + filename.replace(/_/g, '__').replace(/\/|\\/g, '_');
                        newfilename = path.normalize(path.join(dest.deps, '/' + newfilename));
                        grunt.file.copy(filename, newfilename);
                        grunt.log.writeln('File "' + filename + '" copied to "' + newfilename + '" (dependency).');
                    }
                }
            }
        });
    });

};
