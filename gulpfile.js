var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require( 'autoprefixer-stylus' );
    
gulp.task( 'stylus', ['print'], function (){
    gulp.src('./lib/stylus/*.styl')

    .pipe( stylus( {
        use: autoprefixer(),
        compress: true
    }     
    ) )
    .pipe(gulp.dest('./css/'));
} );

gulp.task('print', function(){
    console.log('fez');
});
gulp.task('w', function(){
    gulp.watch(['./lib/stylus/*.styl'], ['stylus']);
});