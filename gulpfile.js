var gulp = require('gulp');

gulp.task('default', function() {
  //no tasks
});
gulp.task('copy-html-files', function() {
  gulp.src(['./app/**/*.html', '!./app/index.html'], {base: './app'})
  .pipe(gulp.dest('build/'));
});
gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});
gulp.task('build', ['copy-html-files', 'usemin']);
