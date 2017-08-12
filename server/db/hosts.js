const connection = require('./connection')

module.exports = {
  createHost,
  getHosts,
  getHost
}

function createHost (host, conn) {
  const db = conn || connection
  return db('hosts')
    .insert(host)
}

function getHosts (conn) {
  const db = conn || connection
  return db('hosts')
    .select()
}

function getHost (id, conn) {
  const db = conn || connection
  return db('hosts')
    .select()
    .where('id', id)
    .first()
}
