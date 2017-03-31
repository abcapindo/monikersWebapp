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
    browserSync = require('browser-sync').create();

var filesToClean = ['./public/scripts', './public/views', './public/stylesheets'];

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/* jshint task would be here */

gulp.task('build-css', function() {
  return gulp.src('source/style/**/*.css')
    .pipe(sourcemaps.init())  // Process the original sources
      // .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('build-js', function() {
  return gulp.src('source/views/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('copy', function() {
  return gulp.src(['source/views/**/*.html'])
    .pipe(flatten())
    .pipe(gulp.dest('public/views'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean', function() {
  return gulp.src(filesToClean, {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean', 'jshint', 'build-js', 'build-css', 'copy']);
/* updated watch task to include sass */

gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch('source/javascript/**/*.js', ['build-js'])
});
