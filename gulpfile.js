'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var livereload = require('gulp-livereload');
var pushserve = require('pushserve');

gulp.task('server', function () {
  var server = pushserve({port: 5000, path: './public'}, function (err) {
    if (err) {
      gutil.log(gutil.colors.red('ERROR'), err);
      return;
    }
  });
});

gulp.task('browserify', function () {
  var bundler = watchify({entries: './lib/index.js', delay: 2500});

  bundler.on('update', rebundle);

  function rebundle () {
    return bundler.bundle().
      pipe(source('bundle.js')).
      pipe(gulp.dest('./public/js/'));
  }

  return rebundle();
});

gulp.task('watch', function () {
  var server = livereload();
  gulp.watch([
    './public/js/bundle.js',
    './public/css/**/*.css',
    './public/**/*.html'
  ], function (event) {
    server.changed(event.path);
  });
});

gulp.task('default', ['server', 'watch', 'browserify']);
