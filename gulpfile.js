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

// Concatenate minified angular core files
gulp.task('ng-core', function(){
	return gulp.src([
			'node_modules/angular/angular.min.js',
			'node_modules/angular-route/angular-route.min.js'
		])
		.pipe(concat('ng-core.js'))
		.pipe(gulp.dest('public/js'))
})


// Concatenate & minify JS
gulp.task('ng-custom', function(){
	return gulp.src([
			'js/angular/poke-list/poke-list.module.js', 
			'js/angular/poke-list/poke-list.component.js', 
			'js/angular/poke-detail/poke-detail.module.js',
			'js/angular/poke-detail/poke-detail.component.js',  
			'js/angular/app.module.js',
			'js/angular/app.config.js'
		])
		.pipe(concat('ng-custom.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(connect.reload());
})

gulp.task('scripts', function(){
	return gulp.src([
			'public/js/ng-core.js',
			'public/js/ng-custom.js'
		])
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(connect.reload());
})

// Watch Files for Changes 
gulp.task('watch', function(){
	gulp.watch('*.html', ['html'])
	gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch('less/*.less', ['lint', 'less']);
})


gulp.task('default', ['lint', 'connect', 'less', 'ng-core', 'ng-custom', 'scripts', 'watch']);