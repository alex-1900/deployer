const gulp = require('gulp');

const { haizeimaoSync, haizeimaoReboot } = require('./src/haizeimao')

gulp.task('haizeimao_sync', haizeimaoSync)
gulp.task('haizeimao_reboot', haizeimaoReboot)
