const gulp = require('gulp');
const gprint = require('gulp-print').default;
const gutil = require("gulp-util");
const del = require('del');
const vinylPaths = require('vinyl-paths');
const webpack_stream = require('webpack-stream')
const webpack_config = require('./webpack.config.js');

const paths = {
    src: './src/',
    dist: './dist/'
};

gulp.task('clean', () => {
    return gulp.src(`${paths.dist}*`)
        .pipe(gprint())
        .pipe(vinylPaths(del));
});

gulp.task('webpack', gulp.series('clean', () => {
    return webpack_stream(webpack_config)
        .pipe(gulp.dest(`${paths.dist}`));
}));

gulp.task('default', gulp.series('webpack', (done) => {
    // default task code here
    done();
}));