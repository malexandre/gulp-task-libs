const plugins = require('gulp-load-plugins')()

const defaultOptions = {
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
}

const task = (gulp, options, concat = false, uglify = false) => {
    let buildScript = gulp
        .src(options.libs)
        .pipe(plugins.plumber())

    if (concat) {
        buildScript = buildScript.pipe(plugins.concat(options.concatName))
    }

    if (uglify) {
        buildScript = buildScript.pipe(plugins.uglify())
        buildScript = buildScript.pipe(plugins.rename((path) => path.basename += options.uglifySuffix))
    }

    buildScript = buildScript.pipe(gulp.dest(`${options.jsDestinationFolder}`))

    return gulp
        .src(options.htmlFile)
        .pipe(plugins.plumber())
        .pipe(plugins.inject(buildScript, options.injectOptions))
        .pipe(gulp.dest(options.htmlDestinationFolder))
}

module.exports = (gulp, options) => {
    options = Object.assign(defaultOptions, options)
    options.injectOptions = Object.assign(defaultOptions.injectOptions, options.injectOptions)

    gulp.task('libs', () => task(gulp, options))
    gulp.task('libs-concat', () => task(gulp, options, true, false))
    gulp.task('libs-uglify', () => task(gulp, options, false, true))
    gulp.task('libs-concat-uglify', () => task(gulp, options, true, true))
}
