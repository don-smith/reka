const connection = require('./connection')
const hash = require('../auth/hash')

module.exports = {
  createUser,
  userExists,
  getUserById,
  getUserByName
}

function createUser (username, password, conn) {
  const db = conn || connection
  return userExists(username, db)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error('User exists'))
      }
    })
    .then(() => {
      const passwordHash = hash.generate(password)
      return db('users')
        .insert({username, hash: passwordHash})
    })
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
