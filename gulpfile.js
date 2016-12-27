'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('default', function() {
  var files = [
    'node_modules/jsfeat/build/jsfeat.js',
    'node_modules/jsfeat/cascades/frontalface.js',
    'src/shapedetection.js',
  ];

  return gulp.src(files)
    .pipe(concat('shapedetection.js'))
    .pipe(gulp.dest('build'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '-min'
    }))
    .pipe(gulp.dest('build'));
});
