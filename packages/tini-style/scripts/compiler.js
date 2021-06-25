const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const gulpif = require('gulp-if');

const isProduction = process.env.NODE_ENV === 'production';
const dist = isProduction
  ? path.join(__dirname, '..', 'es')
  : path.join(__dirname, '..', '..', '..', 'demo', 'node_modules', '@tiki.vn', 'tini-style', 'es');
const src = path.join(__dirname, '../src');
const extTypes = ['less', 'tcss'];

gulp.task('less', () =>
  gulp
    .src(`${src}/**/*.less`)
    .pipe(less({}))
    .on('error', (e) => console.error(e))
    .pipe(gulpif(isProduction, cleanCss()))
    .pipe(
      rename({
        extname: '.tcss',
      }),
    )
    .pipe(gulp.dest(dist)),
);

gulp.task('tcss', () =>
  gulp.src([`${src}/**/*.tcss`, `!${src}/**/*.skip.tcss`]).pipe(gulp.dest(dist)),
);

const build = gulp.series(...extTypes);
build();

if (!isProduction) {
  extTypes.forEach((type) => {
    const watcher = gulp.watch(`${src}/**/*${type}`, gulp.series(type));
    watcher.on('change', (event) => {
      console.log(`File ${event} was change`);
    });
    watcher.on('add', (event) => {
      console.log(`File ${event} was add`);
    });
    watcher.on('unlink', (event) => {
      console.log(`File ${event} was remove`);
    });
  });
}
