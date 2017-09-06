
var webpackConfig = require('./scripts/webpack.config.js');
var webpackProConfig = require('./scripts/webpack.pro.config.js');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
var mcss = require('gulp_mcss');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var path = require('path');
var process = require('child_process');
var exec = process.exec;
var child;

var count = 0;

gulp.task('webpack', [], createWebpackTask());

gulp.task('eslint', shell.task([ 'eslint ./src']));

// gulp.task('build', ['eslint','webpack']);
gulp.task('build', ['webpack']);


gulp.task('mcss', function(){
     gulp.src(['src/mcss/*.mcss', '!src/mcss/_*.mcss', '!src/mcss/variables.mcss'])
        .pipe(mcss({
            format: 3,
            importCSS: true
            // pathes: ['src/webapp/src/js/lib']
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', ['watch_mcss', 'webpackWatch']);

gulp.task('watch_mcss', function() {
    gulp.watch('src/mcss/**/*.mcss', {exclude: 'src/mass/'},['mcss']);
});
function createWebpackTask(watch){
    var baseConfig = watch? webpackConfig: webpackProConfig;

    var config = Object.assign({ }, baseConfig, {
        watch: watch,
        devtool: watch? 'source-map': undefined,
    })

    return function(){

        gulp.src("src/index.js")
            .pipe(webpack(config, null, function(){
                if (count < 2) {
                    count++;
                    return;
                }
                reload();
            }))
            .pipe(gulp.dest('./WEB-INF'))
            .pipe(gulp.dest('./public'))
            .on("error", function(err){
                throw err
            });
        return;

    }
}
gulp.task('webpackWatch', [], createWebpackTask(true));

gulp.task('browserSync', function() {

    browserSync({
        proxy: 'localhost:8080'
    });

});

gulp.task('server', function() {
    if(child) {
        child.kill();
    } else {
        setTimeout(function () {
            child = exec('nei server', {cwd: path.join(__dirname, './')}, function(err, stdout, stderr) {
                if (err) throw err;
                console.log(stdout, stderr);
            });
        },1000);
    }
});

// 本地nei开发
gulp.task('default', ['server', 'mcss', 'watch']);

// 调试后端接口
gulp.task('interface', ['mcss', 'watch', 'browserSync']);
