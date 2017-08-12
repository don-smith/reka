const test = require('ava')

const db = require('../../../server/db/hosts')

require('./configure-environment')(test)

test('getHost returns a host given their id', t => {
  return db.getHost(1, t.context.connection)
    .then(host => {
      t.is(host.name, 'Julie', 'should return Julie')
    })
    .catch(err => t.fail(err.message))
})

test('getHost returns undefined for a nonexistent host id', t => {
  return db.getHost(9999, t.context.connection)
    .then(host => {
      t.falsy(host, 'should not return host 9999')
    })
    .catch(err => t.fail(err.message))
})

test('getHosts returns all hosts', t => {
  return db.getHosts(t.context.connection)
    .then(hosts => {
      t.is(hosts.length, 1, 'should return 1 host')
      t.is(hosts[0].name, 'Julie', 'should return 1 host')
    })
    .catch(err => t.fail(err.message))
})

test('createHost creates a new host', t => {
  const newHost = {
    name: 'testhost',
    user_id: 1
  }
  const validateNewHost = newIds => {
    const id = newIds[0]
    return db.getHost(id, t.context.connection)
      .then(host => {
        t.is(host.name, newHost.name, 'should create host id ' + id)
      })
  }
  return db.createHost(newHost, t.context.connection)
    .then(validateNewHost)
    .catch(err => t.fail(err.message))
})
