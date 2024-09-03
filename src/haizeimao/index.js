const gulp = require("gulp");
const yaml = require('yaml');
const fs = require('fs');
const {ROOT_PATH} = require("../constants");
const { syncTaskCreator } = require('../lib/common');
const { SSH_KEY } = require('../constants');
const { ssh } = require('../lib/ssh')

/**
 * app 重启任务
 * @param {object} sshConfig 
 * @returns (cb: any) => Promise<void>
 */
function rebootTaskCreator (sshConfig) {
  sshConfig.privateKey = SSH_KEY
  return async (cb) => {
    await ssh(sshConfig, [
      'cd src/fast-bird/',
      'ls -l'
    ])
    cb()
  }
}

/**
 * 同步所有 app
 * @param {Array} apps 
 * @returns 
 */
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

/**
 * 重启所有 app
 * @param {Array} apps 
 * @returns 
 */
function parallelRebootTasks(apps) {
  const tasks = []
  for (const app of Object.values(apps)) {
    if (!app.disable) {
      const task = rebootTaskCreator({
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
  fs.readFileSync(`${ROOT_PATH}/config/haizeimao.yml`)
    .toString()
);

exports.haizeimaoSync = parallelSyncTasks(apps)
exports.haizeimaoReboot = parallelRebootTasks(apps)

exports.haizeimaoSync.description = '海贼猫 rsync 同步'
exports.haizeimaoReboot.description = '海贼猫服务重启'
