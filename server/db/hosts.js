var environment = process.env.NODE_ENV || 'development'
var config = require('../../knexfile')[environment]
var dbConn = require('knex')(config)

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
