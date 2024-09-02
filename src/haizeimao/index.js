const { syncTaskCreator } = require('./sync')
const { rebootTaskCreator } = require('./control')
const gulp = require("gulp");
const yaml = require('yaml');
const fs = require('fs');
const {ROOT_PATH} = require("../constants");

function parallelSyncTasks(apps) {
  const tasks = []
  for (const app of Object.values(apps)) {
    const { source, user, host, dest } = app
    const task = syncTaskCreator({ source, user, host, dest })
    tasks.push(task)
  }
  return gulp.parallel(...tasks)
}

function parallelRebootTasks(apps) {
  const tasks = []
  for (const app of Object.values(apps)) {
    const task = rebootTaskCreator({
      host: app.host,
      port: 22,
      username: app.user,
      privateKey: fs.readFileSync('/home/gray/.ssh/id_rsa')
    })
    tasks.push(task)
  }
  return gulp.parallel(...tasks)
}


const { apps } = yaml.parse(
  fs.readFileSync(`${ROOT_PATH}/config/haizeimao.yml`)
    .toString()
);

exports.haizeimaoSync = parallelSyncTasks(apps)
exports.haizeimaoReboot = parallelRebootTasks(apps)
