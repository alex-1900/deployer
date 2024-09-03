const { SSH_KEY } = require('../constants');
const { ssh } = require('../lib/ssh')

/**
 * 服务重启任务
 * @param {object} sshConfig 
 * @returns (cb: any) => Promise<void>
 */
function pushTaskCreator (sshConfig) {
  sshConfig.privateKey = SSH_KEY
  return async (cb) => {
    await ssh(sshConfig, [
      'cd ~/src/deployer',
      'git add .',
      'git commit -m "update"',
      'git push origin main'
    ])
    cb()
  }
}

exports.pushTaskCreator = pushTaskCreator
