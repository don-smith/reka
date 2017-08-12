const dbConn = require('./connection')

module.exports = {
  createHost,
  getHosts,
  getHost
}

function createHost (host) {
  return dbConn('hosts')
    .insert(host)
}

function getHosts () {
  return dbConn('hosts')
    .select()
}

function getHost (id) {
  return dbConn('hosts')
    .select()
    .where('id', id)
}
