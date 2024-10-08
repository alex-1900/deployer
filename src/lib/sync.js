const RSync = require('rsync');

exports.sync = function ({ source, user, chown, host, dest, exclude, include }) {
  const rsync = new RSync({})
  let inst = rsync
    .source(source)
    .destination(`${user}@${host}:${dest}`)
    .shell('ssh')
    .flags('avz', true)
    .set('progress', false)
    .set('delete', null)
    .set('chown', chown || user)

  if (exclude) {
    inst = inst.exclude(exclude)
  }
  if (include) {
    inst = inst.include(include)
  }
  return inst
}
