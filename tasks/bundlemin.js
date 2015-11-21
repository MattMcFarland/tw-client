var
  browserify = require('browserify'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  gutil = require('gulp-util'),
  pkg = require('../package.json'),
  compressionOptions = require('../config/gulpCompressionOptions');

module.exports = function(entry, name, dest) {
  var b = browserify({
    entries: entry,
    debug: true
  });
  var filename = name + ".min.js";
  return b.bundle()
    .on('error', gutil.log)
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify(compressionOptions))
    .pipe(sourcemaps.write('./'))
    .on('end', () => {
      gutil.log('File Saved', gutil.colors.cyan(dest + '/' + name + '.min.js'));
    })
    .pipe(gulp.dest(dest));
};

