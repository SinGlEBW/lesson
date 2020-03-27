var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('css/scss/**/*.scss')//* это во всех папках/все файлы.scss
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});
 
gulp.task('watch', function () {
  gulp.watch('css/scss/**/*.scss', gulp.parallel('sass'));
});
console.dir(gulp);