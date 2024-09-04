const gulp = require('gulp');

const { githubSyncDeployer, githubPushDeployer } = require('./src/github');
const { syncTasksCreator, commandsTasksCreator } = require('./src/lib/creator');

// deployer
gulp.task('deployer_sync', githubSyncDeployer)
gulp.task('deployer_push', githubPushDeployer)

// 海贼猫
gulp.task('haizeimao_sync', syncTasksCreator('haizeimao'))
gulp.task('haizeimao_reboot', commandsTasksCreator('haizeimao'))
