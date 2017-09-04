var gulp  = require('gulp'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    compass = require('gulp-compass');


//browser sync
gulp.task('browser-sync', ['nodemon', 'styles'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:5000',
        files: ['views/**/*.*'],
        port: 7000
    });

    gulp.watch('src/sass/*.scss', ['styles']);
    gulp.watch('views/*.*').on('change', browserSync.reload);
});

//restart server with nodemon
gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', function () {
		// to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
});


///plumber & notify
var notifyInfo = {
    title: 'Gulp'
};

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: notifyInfo.title,
        message: 'Error: <%= error.message %>'
    })
};

///compass
gulp.task('styles', function() {
    return gulp.src(['src/sass/**/*.scss'])
		.pipe(plumber(plumberErrorHandler))
		.pipe(compass({ css: 'src/stylesheets',
			sass: 'src/sass',
			image: 'src/img'
		}))
		.pipe(gulp.dest('src/stylesheets'));
});



gulp.task('default', ['browser-sync']);
