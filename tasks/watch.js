"use strict";
const
  assign      = require('lodash').assign,
  browserify  = require('browserify'),
  buffer      = require('vinyl-buffer'),
  gulp        = require('gulp'),
  gutil       = require('gulp-util'),
  source      = require('vinyl-source-stream'),
  sourcemaps  = require('gulp-sourcemaps'),
  watchify    = require('watchify');

module.exports = function(entry, name, dest) {
  var customOpts = {
    entries: entry,
    debug: true
  };
  var watch = function () {
    var opts = assign({}, watchify.args, customOpts);
    var b = watchify(browserify(opts));
    var filename = name + ".js";
    b.on('update', watch);
    b.on('log', gutil.log);
    return b.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(filename))
      .pipe(buffer())
      .pipe(sourcemaps.write('./'))
      .on('end', () => {
        gutil.log('File Saved', gutil.colors.cyan(dest + '/' + name + '.js'));
      })
      .pipe(gulp.dest(dest));
  };
  watch();
};
