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
    bundlemin('src/components/index', 'index', 'dist', true);
    bundlemin('src/components/requestform', 'requestform', 'dist', true);
    bundlemin('src/components/requestview', 'requestview', 'dist', true);
});

gulp.task('bundle-dev', () => {
    bundle('src/components/index', 'index', 'dist', true);
    bundle('src/components/requestform', 'requestform', 'dist', true);
    bundle('src/components/requestview', 'requestview', 'dist', true);
});

gulp.task('lint', () => lint('src/**/*.js'));
gulp.task('watch-index', () => watch('src/components/index', 'index', 'dist'));
gulp.task('watch-requestview', () => watch('src/components/requestview', 'requestview', 'dist'));
gulp.task('watch-requestform', () => watch('src/components/requestform', 'requestform', 'dist'));
