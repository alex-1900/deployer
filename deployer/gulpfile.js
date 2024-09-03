const gulp = require('gulp');

const { haizeimaoSync, haizeimaoReboot } = require('./src/haizeimao')
const { haizeimaoSyncDeployer, haizeimaoPushDeployer } = require('./src/deployer')

// 海贼猫
gulp.task('haizeimao_sync', haizeimaoSync)
gulp.task('haizeimao_reboot', haizeimaoReboot)

// deployer
gulp.task('deployer_sync', haizeimaoSyncDeployer)
gulp.task('deployer_push', haizeimaoPushDeployer)
