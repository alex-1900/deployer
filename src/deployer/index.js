const { pushTaskCreator } = require('./control')
const gulp = require("gulp");
const yaml = require('yaml');
const fs = require('fs');
const {ROOT_PATH} = require("../constants");
const { syncTaskCreator } = require('../lib/common');

function parallelSyncTasks(apps) {
  const tasks = []
  for (const app of Object.values(apps)) {
    if (!app.disable) {
      const { source, user, host, dest, exclude, include } = app
      const task = syncTaskCreator({ source, user, host, dest, exclude, include })
      tasks.push(task)
    }
  }
  return gulp.parallel(...tasks)
}

function parallelPushTasks(apps) {
  const tasks = []
  for (const app of Object.values(apps)) {
    if (!app.disable) {
      const task = pushTaskCreator({
        host: app.host,
        port: 22,
        username: app.user,
      })
      tasks.push(task)
    }
  }
  return gulp.parallel(...tasks)
}


const { apps } = yaml.parse(
  fs.readFileSync(`${ROOT_PATH}/config/github_deployer.yml`)
    .toString()
);

exports.haizeimaoSyncDeployer = parallelSyncTasks(apps)
exports.haizeimaoPushDeployer = parallelPushTasks(apps)

exports.haizeimaoSyncDeployer.description = 'deployer rsync 同步'
exports.haizeimaoPushDeployer.description = 'deployer 提交 git'
