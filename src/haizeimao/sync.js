const RSync = require('rsync');

function syncTaskCreator (profile) {
  return (cb) => {
    const { source, user, host, dest } = profile
    const rsync = new RSync({})
    rsync
      .source(source)
      .destination(`${user}@${host}:${dest}`)
      .shell('ssh')
      .flags('avz', true)
      .set('progress', null)
      .set('delete', null)
      .execute(function(error, code, cmd) {
        if (error) {
          console.log(error)
        }
        cb()
      }, data => {
        console.log(data.toString());
      }, error => {
        console.error(error.toString());
      });
  }
}

exports.syncTaskCreator = syncTaskCreator
