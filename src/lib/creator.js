const gulp = require("gulp");
const { ssh } = require("./client");
const { sync } = require("./sync");
const yaml = require('yaml')
const fs = require('fs');
const { ROOT_PATH } = require("../constants");

/**
 * 通用的 sync 任务
 * @returns (cb: any) => void
 */
function syncTaskCreator(config) {
  return (cb) => {
    if (config.disable) {
      return cb()
    }
    sync(config).execute(function (error, code, cmd) {
      if (error) {
        console.error(error)
      }
      cb()
    }, data => {
      console.log(data.toString());
    }, error => {
      console.error(error.toString());
    })
  }
}

/**
 * 执行 ssh 命令
 * @param {object} config 
 * @returns 
 */
function sshTaskCreator(config) {
  return async (cb) => {
    if (config.disable || !config.commands) {
      return cb();
    }
    await ssh({
      host: config.host,
      port: config.port || 22,
      username: config.user,
    }, config.commands)
    cb()
  }
}

/**
 * Task: 同步所有
 * @param {Array} configs 
 * @returns 
 */
function syncTasksCreator(configName) {
  const { apps: configs } = yaml.parse(
    fs.readFileSync(`${ROOT_PATH}/config/${configName}.yml`).toString()
  );
  const tasks = []
  for (const config of Object.values(configs)) {
    tasks.push(syncTaskCreator(config))
  }
  return gulp.parallel(...tasks)
}

/**
 * Task: 执行 ssh 命令
 * @param {Array} apps 
 * @returns 
 */
function commandsTasksCreator(configName) {
  const { apps: configs } = yaml.parse(
    fs.readFileSync(`${ROOT_PATH}/config/${configName}.yml`).toString()
  );
  const tasks = []
  for (const config of Object.values(configs)) {
    tasks.push(sshTaskCreator(config))
  }
  return gulp.parallel(...tasks)
}

exports.syncTaskCreator = syncTaskCreator;
exports.sshTaskCreator = sshTaskCreator;
exports.syncTasksCreator = syncTasksCreator;
exports.commandsTasksCreator = commandsTasksCreator;
