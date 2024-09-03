const RSync = require('rsync');

exports.sync = function ({ source, user, host, dest, exclude, include }) {
  const rsync = new RSync({})
  let inst = rsync
    .source(source)
    .destination(`${user}@${host}:${dest}`)
    .shell('ssh')
    .flags('avz', true)
    .set('progress', false)
    .set('delete', null)
    .set('chown', user)

  if (exclude) {
    inst = inst.exclude(exclude)
  }
  if (include) {
    inst = inst.include(include)
  }
  return inst
}
