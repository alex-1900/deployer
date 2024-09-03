const { Client } = require('ssh2')

function sshScript(conn, commands) {
  const command = commands.join(' && ').replace(/"/g, '\\"')
  return new Promise((resolve, reject) => {
    conn.exec(`script -q -c "${command}" ~/.scriptlog`, (err, stream) => {
      if (err) {
        throw err
      }
      stream.on('close', (code, signal) => {
        console.log('Stream :: close :: code ', code);
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

function sshShell(conn, commands = []) {
  commands.push('exit')
  const command = commands.join("\n")
  return new Promise((resolve, reject) => {
    console.log(command)
    conn.shell((err, stream) => {
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
      stream.end(command)
    })
  })
}

exports.ssh = (sshConfig, commands = []) => {
  return new Promise((resolve, reject) => {
    const conn = new Client()
    conn.on('ready', async () => {
      console.log('ssh ready')
      try {
        const data = await sshScript(conn, commands)
        resolve(data);
      } catch(error) {
        reject(error)
      }
    })
    conn.connect(sshConfig)
  })
}
