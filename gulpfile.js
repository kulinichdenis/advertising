var gulp = require('gulp');
var qutile = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('js', function(){
	return browserify('./app/js/main.js')
	.bundle()
	.on('error', function(e) {
		qutile.log(e)	
	})
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./app/dist/js'))
	.pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  return gulp.src('app/css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/dist/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: './app/',
    livereload: true
  })
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/css/*.scss'],['sass'])
  gulp.watch(['./app/js/*.js'], ['js'])
});

gulp.task('default', ['connect', 'js', 'html', 'sass','watch'])
