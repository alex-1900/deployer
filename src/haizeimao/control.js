var gulp = require('gulp')
const { Client } = require('ssh2')

const commands = [
  'cd test',
  'ls -l'
]

function sshExec(conn, command) {
  return new Promise((resolve, reject) => {
    console.log(command)
    conn.exec(command, (err, stream) => {
      if (err) {
        throw err
      }
      stream.on('close', (code, signal) => {
        console.log('Stream :: close');
        conn.end();
      }).on('data', (data) => {
        console.log(data.toString());
        resolve(data)
      }).stderr.on('data', (data) => {
        console.error(data.toString())
        reject(data)
      });
    })
  })
}

function rebootTaskCreator (sshConfig) {
  return (cb) => {
    const conn = new Client()
    conn.on('ready', async () => {
      console.log('Client :: ready');
      for (command of commands) {
        await sshExec(conn, command)
      }
      cb()
    })
    conn.connect(sshConfig)
  }
}

exports.rebootTaskCreator = rebootTaskCreator
