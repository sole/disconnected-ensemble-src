'use strict';

/* global __dirname, require */

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var appDst = path.join(__dirname, 'build/');
var appSrc = path.join(__dirname, 'src');
var wwwSrc = path.join(appSrc, 'www');
var wwwDst = path.join(appDst, 'www');

gulp.task('lint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['build-app', 'build-www']);

gulp.task('build-app', ['build-app-static', 'build-app-js']);

gulp.task('build-app-static', function() {
	return gulp.src([
		path.join(appSrc, 'manifest.webapp'),
		path.join(appSrc, 'index.html'),
		path.join(appSrc, 'img/**/*'),
		path.join(appSrc, 'css/**/*')
	], {
		base: appSrc
	})
		.pipe(gulp.dest(appDst));
});

gulp.task('build-app-js', function() {
	return gulp.src(path.join(appSrc, 'server.js'))
		.pipe(browserify())
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest(path.join(appDst, 'js')));
});

gulp.task('build-www', ['build-www-static', 'build-www-js'] );

gulp.task('build-www-static', function() {
	return gulp.src([
			path.join(appSrc, 'www/index.html'),
			path.join(appSrc, 'www/style.css')
		], {
			base: path.join(appSrc, 'www')
		})
		.pipe(gulp.dest(wwwDst));
});

gulp.task('build-www-js', function() {
	return gulp.src(path.join(wwwSrc, 'app.js'))
		.pipe(browserify())
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest(wwwDst));
});

gulp.task('default', [ 'build', 'watch' ]);

gulp.task('watch', function () {
    watch(path.join(appSrc, '**/*'), batch(function() {
        gulp.start('build');
    }));
});
