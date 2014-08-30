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

Use (you can omit some of settings):

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

`deps` is a directory to copy declared in templates dependencies to. For
example, let's assume we have two template files. File `/path/to/file1.ctpl`
depends from `/path/to/script.js` and file `/another/path/file2.ctpl` depends
from `/another/path/style.css`. If our settings look like:

```js
{
    templates: '/build/path/templates.js',
    deps: '/build/path/deps/'
}
```

Resulting structure in `/build/path` will be:

    /build/path
        /deps
            1_script.js
            1_script.js_
            2_style.css
            2_style.css_
        templates.js

Dependencies are properly ordered, files ending with underscore sign
(like `1_script.js_` and `2_style.css_` in our example) contain absolute path
to source.


## Exclude concat.js from common file

By default [concat.js](https://github.com/hoho/concat.js) is built in common
file. You can exclude concat.js from common file:

```js
conkitty: {
    compile: {
        src: ['template1.ctpl', 'template2.ctpl'],
        dest: {
            common: {file: 'path/to/generated/common.js', 'concat.js': false},
            templates: 'path/to/generated/templates.js',
            sourcemap: 'path/to/sourcemap/for/templates.js',
            deps: 'dir/to/copy/dependencies/to'
        }
    }
}
```

## Passing environment object for precompile expressions

You can pass environment object for
[precompile expressions](https://github.com/hoho/conkitty#precompile-expressions):

```js
conkitty: {
    compile: {
        src: ['template1.ctpl', 'template2.ctpl'],
        dest: {
            env: {prop1: 111, prop2: 'dark', prop3: true},
            common: 'path/to/generated/common.js',
            templates: 'path/to/generated/templates.js'
        }
    }
}
```
