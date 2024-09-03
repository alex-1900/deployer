const { pushTaskCreator, localCommitTaskCreator, localPullTask } = require('./control')
const gulp = require("gulp");
const yaml = require('yaml');
const fs = require('fs');
const {ROOT_PATH} = require("../constants");
const { syncTaskCreator } = require('../lib/common');

function syncDeployerTask(apps) {
  const { source, user, host, dest, exclude, include } = apps.deployer

  const commitTask = localCommitTaskCreator('update')
  const syncTask = syncTaskCreator({ source, user, host, dest, exclude, include })
  return gulp.series(commitTask, syncTask)
}

function pushDeployerTask(apps) {
  const pushTask = pushTaskCreator('~/src/deployer', {
    host: apps.deployer.host,
    port: 22,
    username: apps.deployer.user,
  })
  // TODO: 取回任务
  return gulp.series(pushTask)
}

const { apps } = yaml.parse(
  fs.readFileSync(`${ROOT_PATH}/config/github.yml`)
    .toString()
);

exports.githubSyncDeployer = syncDeployerTask(apps)
exports.githubPushDeployer = pushDeployerTask(apps)

exports.githubSyncDeployer.description = 'deployer rsync 同步'
exports.githubPushDeployer.description = 'deployer 提交 git'
