grunt-conkitty
==============

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
            deps: 'path/to/copy/dependencies/to'
        }
    }
}
```
