/*!
 * grunt-conkitty, https://github.com/hoho/grunt-conkitty
 * (c) 2013-2015 Marat Abdullin, MIT license
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
            var dest = f.dest,
                conkitty = new Conkitty(dest && dest.env),
                data,
                filesCreated,
                i,
                filename,
                newfilename,
                fileCount = 0;

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
                    grunt.log.debug('Reading "' + filename + '"');
                    conkitty.push(filename);
                    fileCount++;
                });

            var common,
                noConcatJS;

            if ((common = dest && dest.common)) {
                noConcatJS = common['concat.js'] === false;
                common = common.file || common;
                if (typeof common !== 'string') {
                    common = undefined;
                }
            }

            if (dest.libs) {
                dest.libs.forEach(function(lib) {
                    if (typeof lib.BASE !== 'string' || !(lib.FILES instanceof Array)) {
                        throw new Error('`lib.BASE` and `lib.FILES` have to be a string and an array');
                    }

                    lib.FILES.forEach(function(filename) {
                        filename = path.resolve(lib.BASE, filename);
                        grunt.log.debug('Reading "' + filename + '"');
                        conkitty.push(filename);
                    });
                });
            }

            grunt.log.debug('Compiling templates...');
            conkitty.generate(
                dest.templates && dest.sourcemap ?
                    path.normalize(path.relative(path.dirname(path.resolve(dest.templates)), path.resolve(dest.sourcemap)))
                    :
                    undefined,
                noConcatJS
            );

            var tplCount = conkitty.code.length;
            grunt.log.ok('%s file%s compiled, %s template%s processed.', fileCount, fileCount === 1 ? '' : 's', tplCount, tplCount === 1 ? '' : 's');

            if (dest) {
                if (common) {
                    data = conkitty.getCommonCode();
                    if (data) {
                        grunt.file.write(common, data);
                        filesCreated = true;
                        grunt.log.debug('File "' + common + '" created (common).');
                    }
                }

                data = conkitty.getTemplatesCode();
                if (data && dest.templates) {
                    grunt.file.write(dest.templates, data);
                    filesCreated = true;
                    grunt.log.debug('File "' + dest.templates + '" created (templates).');
                }

                data = conkitty.getSourceMap();
                if (data && dest.templates && dest.sourcemap) {
                    grunt.file.write(dest.sourcemap, data);
                    filesCreated = true;
                    grunt.log.debug('File "' + dest.sourcemap + '" created (source map).');
                }

                if (!filesCreated) {
                    grunt.log.warn('Neither common nor templates file created.');
                }

                data = conkitty.getIncludes();
                if (data && data.length && dest.deps) {
                    var depsDest,
                        depsFile;

                    if (typeof dest.deps === 'string') {
                        depsDest = dest.deps;
                    } else {
                        if (dest.deps.dest) {
                            if (typeof dest.deps.dest !== 'string') {
                                throw new Error('`deps.dest` have to be a string');
                            }
                            depsDest = dest.deps.dest;
                        }

                        if (dest.deps.file) {
                            if (typeof dest.deps.file !== 'string') {
                                throw new Error('`deps.file` have to be a string');
                            }
                            depsFile = dest.deps.file;
                        }
                    }

                    if (!depsDest && !depsFile) {
                        throw new Error('`deps` have to be a string or an object like `{dest: ..., file: ...}`');
                    }

                    if (depsDest) {
                        grunt.file.mkdir(depsDest);
                        for (i = 0; i < data.length; i++) {
                            filename = path.resolve(data[i]);

                            newfilename = zeroPad(i + 1, data.length) + '_' + path.basename(filename);
                            newfilename = path.normalize(path.join(depsDest, newfilename));

                            grunt.file.write(newfilename + '_', filename);
                            grunt.file.copy(filename, newfilename);
                            grunt.log.debug('File "' + filename + '" copied to "' + newfilename + '" (dependency).');
                        }
                    }

                    if (depsFile) {
                        grunt.file.write(depsFile, JSON.stringify(data, undefined, 4));
                        grunt.log.debug('File "' + depsFile + '" (dependences list).');
                    }
                }
            }
        });
    });

};
