grunt-contrib-conkitty
======================

Compile Conkitty Templates

Install:

```sh
npm install grunt-contrib-conkitty --save-dev
```

Enable:

```js
grunt.loadNpmTasks('grunt-contrib-conkitty');
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
