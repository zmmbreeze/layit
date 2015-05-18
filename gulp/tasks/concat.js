var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var include      = require('gulp-include');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').concat;

gulp.task("concat", function() {
    gulp.src(config.src)
        .pipe(include())
        .pipe(gulp.dest(config.dest))
});
