var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    path = {
        src:'./dev',
        dist:'./dist'
    };
gulp.task('clean',function(){
    return gulp.src([path.dist],{read:false}).pipe(clean({force:true}));
})
gulp.task('js',function(){
    var task = {
        concatJs:gulp.src([path.src+'/js/chat.js'])
            .pipe(concat('index.js'))
            .pipe(plumber())
            .pipe(babel({presets: ['es2015']}))
            .pipe(gulp.dest(path.dist+'/js'))
            .pipe(uglify())
            .pipe(rename({extname:'.min.js'}))
            .pipe(gulp.dest(path.dist+'/js'))
    }
    return task;

})
gulp.task('sass',function(){
    return gulp.src([path.src+'/style/index.scss'])
        .pipe(sass({outputStyle:'expanded'}))
        .pipe(gulp.dest(path.dist+'/css'))
        .pipe(minifycss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(path.dist+'/css'))
})
gulp.task('watch',function(){
    gulp.watch([path.src+'/style/*.scss',path.src+'/js/*.js'],['default']);
});
gulp.task('default',['clean'],function(){
    gulp.start('sass','js');
});

