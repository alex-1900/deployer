const gulp = require('gulp');

const { haizeimaoSync, haizeimaoReboot } = require('./src/haizeimao')
const { githubSyncDeployer, githubPushDeployer } = require('./src/github')

// 海贼猫
gulp.task('haizeimao_sync', haizeimaoSync)
gulp.task('haizeimao_reboot', haizeimaoReboot)

// deployer
gulp.task('deployer_sync', githubSyncDeployer)
gulp.task('deployer_push', githubPushDeployer)
