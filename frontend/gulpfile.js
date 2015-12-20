var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Define some paths.
var paths = {
	pages: ['./src/*.html'],
	images: ['./src/img/**/*'],
	fonts: ['./src/fonts/**/*'],
	css: ['./src/**/*.styl'],
	appCss: ['./src/css/app.styl'],
	appJs: ['./src/js/app.js'],
	js: ['src/**/*.js'],
	out: 'dist'
};

gulp.task('images', function () {
	gulp.src(paths.images)
	.pipe(imagemin({
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest(paths.out+'/img'));
});

gulp.task('fonts', function () {
	gulp.src(paths.fonts)
	.pipe(gulp.dest(paths.out+'/fonts'));
});

gulp.task('css', function () {
	gulp.src(paths.appCss)
	.pipe(stylus({
		set: ['resolve url']
	}))
	.pipe(gulp.dest(paths.out + '/css'));
});

gulp.task('pages', function () {
	gulp.src(paths.pages)
	.pipe(gulp.dest(paths.out));
});

gulp.task('js', function() {
	// Browserify/bundle the JS.
	browserify(paths.appJs)
	.transform(reactify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(paths.out + '/js'));

	// Copy un-bundleable libs
	gulp.src([
		'src/js/three.min.js',
		'src/js/psv.js'
	])
	.pipe(gulp.dest(paths.out + '/js'));
});

gulp.task('watch', function() {
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.fonts, ['fonts']);
	gulp.watch(paths.css, ['css']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.pages, ['pages']);
});

gulp.task('default', ['watch', 'images', 'fonts', 'css', 'pages', 'js']);
