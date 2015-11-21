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
module.exports = function(entry, name, dest, callback) {
  var b = browserify({
    entries: entry,
    debug: true
  });
  gutil.log('Creating bundle from', gutil.colors.cyan(entry + '.js'));
  b.on('log', gutil.log);
  return b.bundle()
    .on('error', gutil.log)
    .pipe(source(name + '.js'))
    .pipe(buffer())
    .on('end', () => {
      gutil.log('File Saved', gutil.colors.cyan(dest + '/' + name + '.js'));
      if (callback) callback();
    })
    .pipe(gulp.dest(dest));
};
