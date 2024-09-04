const { SSH_KEY } = require('../constants');
const { ssh } = require('../lib/client')
const gulp = require('gulp');
const git = require('gulp-git')

/**
 * Git 提交任务
 * @param {object} sshConfig 
 * @returns (cb: any) => Promise<void>
 */
function pushTaskCreator (dir, sshConfig) {
  sshConfig.privateKey = SSH_KEY
  return async (cb) => {
    await ssh(sshConfig, [
      `cd ${dir}`,
      'git push origin main'
    ])
    cb()
  }
}

/**
 * 本地 Git 提交任务
 * @param {object} sshConfig 
 * @returns (cb: any) => Promise<void>
 */
function localCommitTaskCreator (commit) {
  return (cb) => {
    gulp.src('./*').pipe(git.add())
    gulp.src('./*').pipe(git.commit(undefined, {
        args: '-m ' + commit,
        disableMessageRequirement: true
      }))
    cb()
  }
}

function localPullTask(cb) {
  git.pull('origin', 'main', {}, function (err) {
    if (err) throw err;
    cb()
  });
}


exports.pushTaskCreator = pushTaskCreator
exports.localCommitTaskCreator = localCommitTaskCreator
exports.localPullTask = localPullTask
