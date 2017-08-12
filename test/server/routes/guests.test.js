import test from 'ava'
import request from 'supertest'
import mock from 'mock-require'

mock('../../../server/db', {
  getGuests: (eventId) => Promise.resolve([
    {id: 1, name: 'guest1', userId: 1, eventId: eventId},
    {id: 2, name: 'guest2', userId: 2, eventId: eventId}
  ]),
  getGuest: (id) => Promise.resolve(
    {id: id, name: 'host ' + id, userId: 4, eventId: 1}
  ),
  createGuest: (newGuest, eventId) => Promise.resolve()
})

const server = require('../../../server/server')

test('GET /events/:id/guests returns all of event guests', t => {
  return request(server)
    .get('/api/v1/events/2/guests')
    .expect(200)
    .then(res => {
      t.is(res.body.length, 2)
      t.deepEqual(res.body[1].name, 'guest2')
    })
    .catch(err => t.fail(err.message))
})

test('GET /guests/:id returns a specific guest', t => {
  return request(server)
    .get('/api/v1/guests/44')
    .expect(200)
    .then(res => {
      t.is(res.body.id, 44)
    })
    .catch(err => t.fail(err.message))
})

test('POST /events/:id/guests creates a new event guests', t => {
  return request(server)
    .post('/api/v1/events/5/guests')
    .send({name: 'testname'})
    .expect(201)
    .then(res => {
      t.pass()
    })
    .catch(err => t.fail(err.message))
})
