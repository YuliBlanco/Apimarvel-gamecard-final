var gulp = require('gulp');
var stylus = require('gulp-stylus'); 
var jade = require('gulp-jade');
var connect = require('connect');
var nib = require('nib');
var api = require('marvel-api');
var babel = require('gulp-babel');
var template = require('es6-template-strings');
var marvel = api.createClient({
  publicKey: '6c1f0554796cc7bb3af7dedb9c17ef34'
, privateKey: '247df6ce58992d53fdb7f78f8f9371a0ed072f11'
});
var server = connect();
 
function compile(str, path) {
  return stylus(str)
    .set('app.styl', path)
    .set('compress', true)
    .use(nib());
}
 

 
// Get one .styl file and render 
gulp.task('stylus2css', function () {
  return gulp.src('./lib/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'));
});


gulp.task('watch', function() {
   // Vigila los cambios en los archivos css
  gulp.watch('./public/app.styl', ['stylus2css']);
   // Vigila el html
  gulp.watch('./public/index.jade', ['jade']);
 });


//gulp con jade
// run this task by typing in gulp jade in CLI
gulp.task('jade', function() {
    return gulp.src('./lib/*.jade')
        .pipe(jade()) // pip to jade plugin
        .pipe(gulp.dest('./')); // tell gulp our output folder
});


 
gulp.task('babelecma', () => {
    return gulp.src('lib/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('babelmarvelapi', () => {
    return gulp.src('lib/util/marvel-api.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/util'));
});

// Tareas por defecto
gulp.task('default', ['stylus2css','jade','watch','babelecma','babelmarvelapi']);