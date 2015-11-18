'use strict';

/* Module Dependencies */
const gulp = require('gulp');

/* Task Dependencies */
const
  bundle = require('./tasks/bundle'),
  bundlemin = require("./tasks/bundlemin"),
  lint = require('./tasks/lint'),
  watch = require('./tasks/watch'),
  sass = require('./tasks/sass');

gulp.task('bundle-prod', ['lint'], () => {
  bundlemin('src/index', 'index', 'dist', true);
  bundlemin('src/requestform', 'requestform', 'dist', true);
  bundlemin('src/requestview', 'requestview', 'dist', true);
  bundlemin('src/profile', 'profile', 'dist', true);
  bundlemin('src/account', 'account', 'dist', true);
});

gulp.task('bundle-dev', () => {
  bundle('src/index', 'index', 'dist', true);
  bundle('src/requestform', 'requestform', 'dist', true);
  bundle('src/requestview', 'requestview', 'dist', true);
  bundle('src/profile', 'profile', 'dist', true);
  bundle('src/account', 'account', 'dist', true);
});

gulp.task('lint', () => lint('src/**/*.js'));
gulp.task('watch-index', () => watch('src/index', 'index', 'dist'));
gulp.task('watch-requestview', () => watch('src/requestview', 'requestview', 'dist'));
gulp.task('watch-requestform', () => watch('src/requestform', 'requestform', 'dist'));
gulp.task('watch-profile', () => watch('src/profile', 'profile', 'dist'));
gulp.task('watch-account', () => watch('src/account', 'account', 'dist'));

gulp.task('sass', () => sass('src/style/scss/main.scss', 'main', 'dist'));
