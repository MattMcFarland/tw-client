'use strict';

/* Module Dependencies */
const gulp = require('gulp');

/* Task Dependencies */
const
    bundle = require('./tasks/bundle'),
    bundlemin = require("./tasks/bundlemin"),
    lint = require('./tasks/lint'),
    watch = require('./tasks/watch');

gulp.task('bundle-prod', ['lint'], () => {
    bundlemin('src/index', 'index', 'dist', true);
    bundlemin('src/requestform', 'requestform', 'dist', true);
    bundlemin('src/requestview', 'requestview', 'dist', true);
});

gulp.task('bundle-dev', () => {
    bundle('src/index', 'index', 'dist', true);
    bundle('src/requestform', 'requestform', 'dist', true);
    bundle('src/requestview', 'requestview', 'dist', true);
});

gulp.task('lint', () => lint('src/**/*.js'));
gulp.task('watch-index', () => watch('src/index', 'index', 'dist'));
gulp.task('watch-requestview', () => watch('src/requestview', 'requestview', 'dist'));
gulp.task('watch-requestform', () => watch('src/requestform', 'requestform', 'dist'));

gulp.task('foo', () => console.log('bar'));
