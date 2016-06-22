// Include gulp
var gulp = require('gulp'),

// Include Our Plugins 
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

// Lint Task 
gulp.task('lint', function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Server 
gulp.task('connect', function(){
	connect.server({
		livereload: true
	});
})

// Reload on html
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

// Compile less
gulp.task('less', function(){
	return gulp.src('less/*.less')
		.pipe(less())
		.pipe(concat('common.css'))
		.pipe(gulp.dest('public/css'))
    	.pipe(connect.reload());

})

// Concatenate & minify JS
gulp.task('scripts', function(){
	return gulp.src([
				'js/angular/poke-list/poke-list.module.js', 
				'js/angular/poke-list/poke-list.component.js', 
				'js/angular/app.module.js'
			])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(connect.reload());
})

// Watch Files for Changes 
gulp.task('watch', function(){
	gulp.watch('*.html', ['html'])
	gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch('less/*.less', ['lint', 'less']);
})


gulp.task('default', ['lint', 'connect', 'less', 'scripts', 'watch']);