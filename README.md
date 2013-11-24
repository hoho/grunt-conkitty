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
        files: {
            'result.js': ['template1.ctpl', 'template2.ctpl']
        }
    }
}
```
