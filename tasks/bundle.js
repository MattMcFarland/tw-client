const
  browserify = require('browserify'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  gutil = require('gulp-util');

/**
 *
 * @param entry
 * @param name
 * @param dest

 * @returns {*}
 */
module.exports = function(entry, name, dest) {
  var b = browserify({
    entries: entry,
    debug: true
  });
  return b.bundle()
    .on('error', gutil.log)
    .pipe(source(name + '.js'))
    .pipe(buffer())
    .pipe(gulp.dest(dest));
};
