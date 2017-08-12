const connection = require('./connection')
// const crypto = require('../auth/crypto')

module.exports = {
  createUser,
  userExists,
  getUserById,
  getUserByName
}

function createUser (username, password, conn) {
  // const hash = crypto.getHash(password)
  const db = conn || connection
  return db('users')
    .insert({username, hash: ''})
}

function userExists (username, conn) {
  const db = conn || connection
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserById (id, conn) {
  const db = conn || connection
  return db('users')
    .select('id', 'username')
    .where('id', id)
    .first()
}

function getUserByName (username, conn) {
  const db = conn || connection
  return db('users')
    .select()
    .where('username', username)
    .first()
}
