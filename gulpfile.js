'use strict';

/* global require */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var path = require('path');
var fs = require('fs');

var appPath = path.join(__dirname, 'build/');
var appSrc = path.join(__dirname, 'src');

gulp.task('lint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['build-app', 'build-www']);

gulp.task('build-app', ['build-app-static']);

gulp.task('build-app-static', function() {
	return gulp.src([
		path.join(appSrc, 'manifest.webapp'),
		path.join(appSrc, 'img/**/*')
	], {
		base: appSrc
	})
		.pipe(gulp.dest(appPath));
});

gulp.task('build-www', ['build-www-static'] );

gulp.task('build-www-static', function() {
	return gulp.src([
			path.join(appSrc, 'www/index.html')
		], {
			base: path.join(appSrc, 'www')
		})
		.pipe(gulp.dest(path.join(appPath, 'www')));
});


