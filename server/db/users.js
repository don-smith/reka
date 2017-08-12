const dbConn = require('./connection')
const crypto = require('../auth/crypto')

module.exports = {
  createUser,
  userExists,
  getUserById,
  getUserByName
}

function createUser (username, password) {
  const hash = crypto.getHash(password)
  return dbConn('users')
    .insert({username, hash})
}

function userExists (username) {
  return dbConn('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserById (id) {
  return dbConn('users')
    .select('id', 'username')
    .where('id', id)
}

function getUserByName (username) {
  return dbConn('users')
    .select()
    .where('username', username)
}
