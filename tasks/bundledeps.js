var
  browserify = require('browserify'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  getNPMPackageIds = require('./helpers').getNPMPackageIds,
  nodeResolve = require('resolve'),
  compressionOptions = require('../config/gulpCompressionOptions');

module.exports = function(name, dest, callback) {
  var b = browserify({debug: false});
  var filename = name + ".min.js";

  getNPMPackageIds().forEach(function (id) {
    b.require(nodeResolve.sync(id), { expose: id });
  });

  return b.bundle()
    .on('error', gutil.log)
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(uglify(compressionOptions))
    .on('end', () => {
      gutil.log('File Saved', gutil.colors.cyan(dest + '/' + name + '.min.js'));
    })
    .pipe(gulp.dest(dest));
};

