var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber');

module.exports = function(entry, name, dest) {
  return gulp.src(paths)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(source(name + '.css'))
    .pipe(sass())
    .pipe(gulp.dest(dest));
}

