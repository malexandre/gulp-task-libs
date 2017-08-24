# GULP-TASK-ANGULAR-SORT-ANNOTATE

This module create gulp tasks to include all libs in your html.

## Installation

```bash
npm install --save-dev gulp-task-libs
yarn add -D gulp-task-libs
```

## Usage

This is the default options :

```javascript
const gulp = require('gulp')

require('gulp-task-libs')(gulp,
    htmlFile: 'index.html',
    libs: ['libs/**/*.js', '!/build'],
    htmlDestinationFolder: 'build',
    jsDestinationFolder: 'build/js',
    concatName: 'libs.js',
    uglifySuffix: '.min',
    injectOptions: {
        relative: false,
        ignorePath: ['build'],
        addRootSlash: true,
        starttag: '<!-- inject:libs:js -->'
    }
})

gulp.task('prod', ['gulp-libs-concat-uglify'])
// gulp.task('prod', ['gulp-libs-concat'])
// gulp.task('prod', ['gulp-libs-uglify'])
gulp.task('default', ['gulp-libs'])
```

For the injection to work, you need this in your html file:

```html
<!-- inject:angular-sort-annotate:js -->
<!-- endinject -->
```
