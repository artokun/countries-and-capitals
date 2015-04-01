/*globals require*/
// Include gulp
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

gulp.task('copy-html-files', function () {
  'use strict';
  gulp.src(['./app/**/*.html', '!./app/index.html'], {
    base: './app'
  })
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function () {
  'use strict';
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('connect', function () {
  'use strict';
  connect.server({
    root: 'app/'
  });
});

// Default Task
gulp.task('default', ['connect']);
gulp.task('build', ['copy-html-files', 'usemin']);

//sudo npm install gulp gulp-connect gulp-uglify gulp-minify-html gulp-minify-css gulp-usemin gulp-rev gulp-clean --save-dev