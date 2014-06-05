/*!
 * grunt-conkitty, https://github.com/hoho/grunt-conkitty
 * (c) 2013-2014 Marat Abdullin, MIT license
 */

'use strict';


function zeroPad(cur, max) {
    var zeros = Math.floor(max / 10),
        ret = [];

    while (zeros > 0) {
        zeros = Math.floor(zeros / 10);
        ret.push('0');
    }

    return ret.join('') + cur;
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

            dest = f.dest;

            if (dest.libs) {
                dest.libs.forEach(function(lib) {
                    if (typeof lib.BASE !== 'string' || !(lib.FILES instanceof Array)) {
                        throw new Error('`lib.BASE` and `lib.FILES` have to be string and array');
                    }

                    lib.FILES.forEach(function(filename) {
                        filename = path.resolve(lib.BASE, filename);
                        grunt.log.writeln('Reading "' + filename + '"');
                        conkitty.push(filename);
                    });
                });
            }

            grunt.log.writeln('Compiling templates...');
            conkitty.generate(
                dest.templates && dest.sourcemap ?
                    path.normalize(path.relative(path.dirname(path.resolve(dest.templates)), path.resolve(dest.sourcemap)))
                    :
                    undefined
            );
            grunt.log.writeln('Compiled.');

            if (dest) {
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

                data = conkitty.getSourceMap();
                if (data && dest.templates && dest.sourcemap) {
                    grunt.file.write(dest.sourcemap, data);
                    filesCreated = true;
                    grunt.log.writeln('File "' + dest.sourcemap + '" created (source map).');
                }

                if (!filesCreated) {
                    grunt.log.warn('Neither common nor templates file created.');
                }

                data = conkitty.getIncludes();
                if (data && data.length && dest.deps) {
                    grunt.file.mkdir(dest.deps);
                    for (i = 0; i < data.length; i++) {
                        filename = path.resolve(data[i]);

                        newfilename = zeroPad(i + 1, data.length) + '_' + path.basename(filename);
                        newfilename = path.normalize(path.join(dest.deps, newfilename));

                        grunt.file.write(newfilename + '_', filename);
                        grunt.file.copy(filename, newfilename);
                        grunt.log.writeln('File "' + filename + '" copied to "' + newfilename + '" (dependency).');
                    }
                }
            }
        });
    });

};
