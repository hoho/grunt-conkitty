# grunt-conkitty [![Build Status](https://travis-ci.org/hoho/grunt-conkitty.svg?branch=master)](https://travis-ci.org/hoho/grunt-conkitty)

Compile Conkitty Templates

Install:

```sh
npm install grunt-conkitty --save-dev
```

Enable:

```js
grunt.loadNpmTasks('grunt-conkitty');
```

Use:

```js
conkitty: {
    compile: {
        src: ['template1.ctpl', 'template2.ctpl'],
        dest: {
            common: 'path/to/generated/common.js',
            templates: 'path/to/generated/templates.js',
            sourcemap: 'path/to/sourcemap/for/templates.js',
            deps: 'dir/to/copy/dependencies/to'
        }
    }
}
```
