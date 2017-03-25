const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const gulpIf = require("gulp-if");
const rename = require("gulp-rename");

const debug = true;
const isMinify = debug ? false : true;

gulp.task('default', ['stylus', 'pug']);

// stylus
gulp.task('stylus', () => {
  return gulp.src('src/stylesheets/gitHub/style.stly')
    .pipe(stylus())
    .pipe(rename('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4','ios_saf >= 8'],
      cascade: false
    }))
    .pipe(gulpIf(isMinify,
      minifycss()
    ))
    .pipe(gulp.dest('dist/gitHub/'));
});

// pug
gulp.task('pug', () => {
  gulp.src('src/templates/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

// cssとpugの監視
gulp.task('watch', () => {
  gulp.watch(['src/stylesheets/**'], () => {
    gulp.start(['stylus']);
  });
  gulp.watch(['./pug/**'], () => {
    gulp.start(['pug']);
  });
});
