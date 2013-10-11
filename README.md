grunt-contrib-conkitty
======================

Compile Conkitty Templates

Install:

    npm install grunt-contrib-conkitty --save-dev

Enable:

    grunt.loadNpmTasks('grunt-contrib-conkitty');

Use:

    conkitty: {
        compile: {
            files: {
                'result.js': ['template1.ctpl', 'template2.ctpl']
            }
        }
    }
