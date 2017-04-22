var gulp = require('gulp'),
    stylus = require('gulp-stylus');


gulp.task( 'stylus', function (){
    gulp.src('./lib/stylus/*.styl')
    .pipe( stylus() )
    .pipe(gulp.dest('./css/'));
} );