var production = true,
    inputCss = 'sass/main.sass',
    outputCss = 'css/',
    inputJs = './js/src/app.js',
    outputJs = './js/',
    url = "http://localhost/johanstahl",
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    uglifycss = require('gulp-uglifycss'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    webpack = require('webpack-stream');

gulp.task('default', function() {
    gulp.start('styles');
    gulp.start('webpack');
});

gulp.task('serve', function() {
    browserSync.init({
        proxy: url,
        notify: false,
        ghostMode: false
    });
    gulp.watch(['sass/**/*.scss', 'sass/**/*.sass'], ['styles']);
    gulp.watch("**/*.php").on('change', reload);
    gulp.watch(inputJs, ['webpack']).on('change', reload);
});
gulp.task('resume', function() {
    browserSync.init({
    	open:false,
        proxy: url,
        notify: false,
        ghostMode: false
    });
    gulp.watch(['sass/**/*.scss', 'sass/**/*.sass'], ['styles']);
    gulp.watch("**/*.php").on('change', reload);
    gulp.watch(inputJs, ['webpack']);
});
gulp.task('ghost', function() {
    browserSync.init({
        open:false,
        proxy: url,
        notify: false,
        ghostMode: {
            clicks: true,
            scroll: true,
            forms: {
                submit: true,
                inputs: true,
                toggles: true
            }
        }
    });
    gulp.watch(['sass/**/*.scss', 'sass/**/*.sass'], ['styles']);
    gulp.watch("**/*.php").on('change', reload);
    gulp.watch(inputJs, ['webpack']).on('change', reload);
});
gulp.task('watch', function() {
    gulp.watch(['sass/**/*.scss', 'sass/**/*.sass'], ['styles']);
    gulp.watch(inputJs, ['webpack']);
});
gulp.task('styles', function() {
    return gulp
        .src(inputCss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 3 version'))
        .pipe(gulpif(!production,sourcemaps.write()))
        .pipe(gulpif(production, uglifycss()))
        .pipe(gulp.dest(outputCss))
        .pipe(reload({
            stream: true
        }))
});
gulp.task('webpack', function() {
    gulp
    	.src(inputJs)
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest(outputJs))
        .pipe(reload({
            stream: true
        }))
});