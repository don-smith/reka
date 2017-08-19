const test = require('ava')

const db = require('../../../server/db/users')

require('./configure-environment')(test)

test('getUserById returns a user given their id', t => {
  return db.getUserById(1, t.context.connection)
    .then(user => {
      t.is(user.username, 'jules', 'should return jules')
    })
    .catch(err => t.fail(err.message))
})

test('getUserById returns undefined for a nonexistent user id', t => {
  return db.getUserById(9999, t.context.connection)
    .then(user => {
      t.falsy(user, 'should not return user 9999')
    })
    .catch(err => t.fail(err.message))
})

test('getUserByName returns a user given their username', t => {
  return db.getUserByName('jules', t.context.connection)
    .then(user => {
      t.is(user.id, 1, 'should return user id 1')
    })
    .catch(err => t.fail(err.message))
})

test('getUserByName returns undefined for a nonexistent username', t => {
  return db.getUserByName('whodat', t.context.connection)
    .then(user => {
      t.falsy(user, 'should not return user whodat')
    })
    .catch(err => t.fail(err.message))
})

test('userExists returns true for an existing username', t => {
  return db.userExists('jules', t.context.connection)
    .then(exists => {
      t.true(exists, 'should return true for id of 1')
    })
    .catch(err => t.fail(err.message))
})

test('userExists returns false for a nonexistent username', t => {
  return db.userExists('whodat', t.context.connection)
    .then(exists => {
      t.false(exists, 'should not return user whodat')
    })
    .catch(err => t.fail(err.message))
})

test('createUser creates a new user', t => {
  const username = 'iamnew'
  const validateNewUser = newIds => {
    const id = newIds[0]
    return db.getUserById(id, t.context.connection)
      .then(user => {
        t.is(user.username, username, 'should create user id ' + id)
      })
  }
  return db.createUser(username, '', t.context.connection)
    .then(validateNewUser)
    .catch(err => t.fail(err.message))
})

test('createUser fails if username already exists', t => {
  const createNewUser = () => {
    return db.createUser('iamnew', 'password', t.context.connection)
  }
  return createNewUser()
    .then(() => t.throws(createNewUser()))
})
