var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require( 'autoprefixer-stylus' );
    
var sourcemaps = require('gulp-sourcemaps');

gulp.task( 'stylus', function (){

    gulp.src(__dirname +'/src/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe( stylus(
        {           
            compress: false
        }    
    ) )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'));
} );

gulp.task('print', function(){
    console.log('fez');
});

gulp.task('w', function(){
    gulp.watch([ __dirname + '/src/stylus/**/*.styl'], ['stylus']);
});