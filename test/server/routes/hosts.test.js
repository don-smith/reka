import test from 'ava'
import request from 'supertest'
import mock from 'mock-require'

mock('../../../server/db', {
  getHosts: () => Promise.resolve([
    {id: 1, name: 'host1', userId: 1},
    {id: 2, name: 'host2', userId: 2}
  ]),
  getHost: (id) => Promise.resolve(
    {id: id, name: 'host ' + id, userId: 4}
  ),
  createHost: (newHost) => Promise.resolve()
})

const server = require('../../../server/server')

test('GET /hosts returns all hosts', t => {
  return request(server)
    .get('/api/v1/hosts')
    .expect(200)
    .then(res => {
      t.is(res.body.length, 2)
      t.deepEqual(res.body[1].name, 'host2')
    })
    .catch(err => t.fail(err.message))
})

test('GET /hosts/:id returns a specific hosts', t => {
  return request(server)
    .get('/api/v1/hosts/44')
    .expect(200)
    .then(res => {
      t.deepEqual(res.body.userId, 4)
    })
    .catch(err => t.fail(err.message))
})

test('POST /hosts creates a new hosts', t => {
  return request(server)
    .post('/api/v1/hosts')
    .send({name: 'testname'})
    .expect(201)
    .then(res => {
      t.pass()
    })
    .catch(err => t.fail(err.message))
})
