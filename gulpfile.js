/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    clean = require('gulp-clean'),
    browserify = require('gulp-browserify'),
    del = require('del'),
    browserSync = require('browser-sync').create();

var filesToClean = ['./public/scripts', './public/views', './public/stylesheets'];

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', ['jshint'], function() {
  return gulp.src('source/views/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({stream: true}));
});

/* jshint task would be here */

gulp.task('build-css', ['font-awesome'], function() {
  return gulp.src('source/style/**/*.css')
    .pipe(sourcemaps.init())  // Process the original sources
      // .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('font-awesome', function() {
    return gulp.src('source/style/fonts/**/*')
    .pipe(gulp.dest('public/stylesheets/fonts'));
});

gulp.task('build-js', function() {
  return gulp.src(['source/views/**/*.js', 'source/index.controller.js'])
    // .pipe(browserify({
    //   insertGlobals: true
    // }))
    .pipe(concat('bundle.js'))
    //only uglify if gulp is ran with '--type production'
    // .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/scripts'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('vendor', function() {
    return gulp.src('source/ui-bootstrap-tpls-2.5.0.min.js')
      .pipe(gulp.dest('public/scripts'));
});

gulp.task('copy-index', function() {
  return gulp.src(['source/index.html'])
    .pipe(flatten())
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('copy', ['copy-index'], function() {
  return gulp.src(['source/views/**/*.html'])
    .pipe(flatten())
    .pipe(gulp.dest('public/views'))
    .pipe(browserSync.reload({stream: true}));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('clean', function() {
  return del.sync('public');
});

gulp.task('build', ['clean', 'build-js', 'build-css', 'copy', 'vendor']);
/* updated watch task to include sass */

gulp.task('watch', ['build','browser-sync'], function() {
  gulp.watch('source/views/**/*.js', ['jshint']);
  gulp.watch('source/style/**/*.css', ['build-css']);
  gulp.watch('source/views/**/*.js', ['build-js']);
  gulp.watch('source/views/**/*.html', ['copy']);
  gulp.watch('source/index.html', ['copy-index']);
});
