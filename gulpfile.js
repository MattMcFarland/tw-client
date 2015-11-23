'use strict';
var i = 0, names;
/* Module Dependencies */
const gulp = require('gulp');
/* Task Dependencies */
const
  bundle = require('./tasks/bundle'),
  bundlemin = require("./tasks/bundlemin"),
  lint = require('./tasks/lint'),
  gutil = require('gulp-util'),
  watch = require('./tasks/watch'),
  sass = require('./tasks/sass');

const bundles = [
  'src/index',
  'src/requestform',
  'src/requestview',
  'src/profile',
  'src/account'
]

const next = function (done) {
  i++;
  if (i === bundles.length - 1) {
    done();
  }
}

gulp.task('bundle-prod', (done) => {

  i = 0;

  sass('src/style/scss/main.scss', 'main', 'dist/style');
  bundles.forEach((path) => {
    bundlemin(path, path.split('/')[1], 'dist/js', () => next(done));
  })
});

gulp.task('bundle-dev', (done) => {

  i = 0;

  sass('src/style/scss/main.scss', 'main', 'dist/style');
  bundles.forEach((path) => {
    bundle(path, path.split('/')[1], 'dist/js', () => next(done));
  })
});

gulp.task('watch-index', () => watch('src/index', 'index', 'dist/js'));
gulp.task('watch-requestview', () => watch('src/requestview', 'requestview', 'dist/js'));
gulp.task('watch-requestform', () => watch('src/requestform', 'requestform', 'dist/js'));
gulp.task('watch-profile', () => watch('src/profile', 'profile', 'dist/js'));
gulp.task('watch-account', () => watch('src/account', 'account', 'dist/js'));

gulp.task('watch-sass', () => {
  gutil.log('Watch src/style/**/*.scss');
  gulp.watch('src/style/**/*.scss', (e) => {
    gutil.log('File Changed', gutil.colors.cyan(e.path));
    sass('src/style/main.scss', 'main', 'dist/style')
  });
});


gulp.task('lint', () => lint('src/**/*.js'));
gulp.task('sass', () => sass('src/style/main.scss', 'main', 'dist/style'));
