var environment = process.env.NODE_ENV || 'development'
var config = require('../../knexfile')[environment]
var dbConn = require('knex')(config)

module.exports = dbConn
