const { SSH_KEY } = require('../constants');
const { ssh } = require('../lib/ssh')

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

exports.pushTaskCreator = pushTaskCreator
