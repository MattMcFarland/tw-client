'use strict';

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

gulp.task('bundle-prod', ['lint'], () => {
  bundlemin('src/index', 'index', 'dist/js', true);
  bundlemin('src/requestform', 'requestform', 'dist/js', true);
  bundlemin('src/requestview', 'requestview', 'dist/js', true);
  bundlemin('src/profile', 'profile', 'dist/js', true);
  bundlemin('src/account', 'account', 'dist/js', true);
});

gulp.task('bundle-dev', () => {
  bundle('src/index', 'index', 'dist/js', true);
  bundle('src/requestform', 'requestform', 'dist/js', true);
  bundle('src/requestview', 'requestview', 'dist/js', true);
  bundle('src/profile', 'profile', 'dist/js', true);
  bundle('src/account', 'account', 'dist/js', true);
  sass('src/style/scss/main.scss', 'main', 'dist/style');
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
