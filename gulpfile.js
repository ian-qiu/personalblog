//var elixir = require('laravel-elixir');
//
///*
// |--------------------------------------------------------------------------
// | Elixir Asset Management
// |--------------------------------------------------------------------------
// |
// | Elixir provides a clean, fluent API for defining some basic Gulp tasks
// | for your Laravel application. By default, we are compiling the Sass
// | file for our application, as well as publishing vendor resources.
// |
// */
//
//elixir(function(mix) {
//    mix.sass('app.scss');
//});
var gulp = require('gulp');
var elixir =  require('laravel-elixir');
gulp.task("copyfiles", function() {

    gulp.src("vendor/bower_dl/jquery/dist/jquery.js")
        .pipe(gulp.dest("resources/assets/js/"));

    gulp.src("vendor/bower_dl/Materialize/sass/**")
        .pipe(gulp.dest("resources/assets/sass/Materialize"));

    gulp.src("vendor/bower_dl/Materialize/dist/js/materialize.js")
        .pipe(gulp.dest("resources/assets/js/"));

    gulp.src("vendor/bower_dl/Materialize/dist/fonts/**")
        .pipe(gulp.dest("public/assets/fonts"));

    /**
     * Default gulp is to run this elixir stuff
     */
    elixir(function(mix) {

        // 合并 scripts
        mix.scripts(['jquery.js','materialize.js'],
            'public/assets/js/self.js'
        );

        // 编译 Less
        mix.sass('self.scss', 'public/assets/css');
    });
});