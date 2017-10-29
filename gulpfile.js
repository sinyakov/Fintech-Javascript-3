const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const minifyCss = require('gulp-csso');
const minifyJs = require('gulp-minify');
const rename = require('gulp-rename');
const rsync = require('gulp-rsync');

const autoprefixer = require('autoprefixer');
const del = require('del');
const run = require('run-sequence');

const server = require('browser-sync').create();

gulp.task('clean', () => del('./build'));

gulp.task('copy', () => gulp.src('./06/assets/**').pipe(gulp.dest('./build')));

gulp.task('style', () =>
  gulp
    .src('./06/less/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(minifyCss())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./build'))
    .pipe(server.stream())
);

gulp.task('scripts', () =>
  gulp
    .src('./06/js/*.js')
    .pipe(
      minifyJs({
        ext: {
          min: '.js'
        },
        noSource: true
      })
    )
    .pipe(gulp.dest('./build/js'))
);

gulp.task('build', done => run('clean', 'copy', 'style', 'scripts', done));

gulp.task('serve', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('./06/less/**.less', ['style']);
  gulp.watch('./06/assets/**', ['copy']);
  gulp.watch('./06/js/*.js', ['scripts']);
});

gulp.task('deploy', () =>
  gulp.src('$TRAVIS_BUILD_DIR/build/**').pipe(
    rsync({
      root: '$TRAVIS_BUILD_DIR/build/',
      username: 'root',
      hostname: '188.226.171.191',
      destination: '/var/www/tinkoff/',
      recursive: true,
      clean: true,
      incremental: true,
      exclude: '.DS_Store'
    })
  )
);
