'use strict';
var i = 0, names;
/* Module Dependencies */
const gulp = require('gulp');
/* Task Dependencies */
const
  bundle = require('./tasks/bundle'),
  bundlemin = require("./tasks/bundlemin"),
  bundledeps = require('./tasks/bundledeps'),
  gutil = require('gulp-util'),
  watch = require('./tasks/watch'),
  sass = require('./tasks/sass');

gulp.task('bundle-vendor', (done) => {
  bundledeps('vendor', 'dist/js', done);
});

gulp.task('bundlemin-index', () => bundlemin('src/index', 'index', 'dist/js'));
gulp.task('bundlemin-requestview', () => bundlemin('src/requestview', 'requestview', 'dist/js'));
gulp.task('bundlemin-requestform', () => bundlemin('src/requestform', 'requestform', 'dist/js'));
gulp.task('bundlemin-profile', () => bundlemin('src/profile', 'profile', 'dist/js'));
gulp.task('bundlemin-account', () => bundlemin('src/account', 'account', 'dist/js'));
gulp.task('bundlemin-page', () => bundlemin('src/page', 'page', 'dist/js'));

gulp.task('bundlemin', ['bundlemin-index','bundlemin-requestview','bundlemin-requestform','bundlemin-profile','bundlemin-account', 'bundlemin-page']);

gulp.task('bundle-prod',['sass', 'bundlemin']);

gulp.task('bundle-index', () => bundle('src/index', 'index', 'dist/js'));
gulp.task('bundle-requestview', () => bundle('src/requestview', 'requestview', 'dist/js'));
gulp.task('bundle-requestform', () => bundle('src/requestform', 'requestform', 'dist/js'));
gulp.task('bundle-profile', () => bundle('src/profile', 'profile', 'dist/js'));
gulp.task('bundle-account', () => bundle('src/account', 'account', 'dist/js'));
gulp.task('bundle-page', () => bundle('src/page', 'page', 'dist/js'));

gulp.task('bundle', ['bundle-index','bundle-requestview','bundle-requestform','bundle-profile','bundle-account', 'bundlemin-page']);

gulp.task('bundle-dev',['sass', 'bundle']);

gulp.task('bundle-all', ['sass', 'bundlemin', 'bundle']);

gulp.task('watch-index', () => watch('src/index', 'index', 'dist/js'));
gulp.task('watch-requestview', () => watch('src/requestview', 'requestview', 'dist/js'));
gulp.task('watch-requestform', () => watch('src/requestform', 'requestform', 'dist/js'));
gulp.task('watch-profile', () => watch('src/profile', 'profile', 'dist/js'));
gulp.task('watch-account', () => watch('src/account', 'account', 'dist/js'));
gulp.task('watch-page', () => bundle('src/page', 'page', 'dist/js'));


gulp.task('watch-sass', () => {
  gutil.log('Watch src/style/**/*.scss');
  gulp.watch('src/style/**/*.scss', (e) => {
    gutil.log('File Changed', gutil.colors.cyan(e.path));
    sass('src/style/main.scss', 'main', 'dist/style')
  });
});

gulp.task('sass', () => sass('src/style/main.scss', 'main', 'dist/style'));

