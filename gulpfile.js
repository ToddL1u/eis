var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var jade        = require('gulp-jade');

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass','jade-watch'], function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: true
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
 gulp.task('sass', function () {
     return gulp.src(['assets/css/main.scss','assets/css/admin-main.scss'])

         .pipe(sass({
             includePaths: ['css'],
             onError: browserSync.notify
         }))
        //  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
         .pipe(gulp.dest('assets/css'))
         .pipe(browserSync.reload({stream:true}));
 });

// gulp.task('sass-watch', ['sass'], browserSync.reload);

/*
* Travis is trying to Gulp stuff
*/

gulp.task('jade', function(){
  return gulp.src('jade/**/*.jade')
  .pipe(jade({
          pretty: true
      }))
  .pipe(gulp.dest('admin/'));
  // .pipe(browserSync.reload({stream:true}));
});

gulp.task('jade-watch', ['jade'], function () {
    browserSync.reload();
});



/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('jade/**/*.jade', ['jade-watch']);
    gulp.watch(['employee/**/*.html','index.html'],['browser-sync']);
});







/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
