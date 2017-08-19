import test from 'ava'
import request from 'supertest'
import mock from 'mock-require'

import getToken from './get-token'

mock('../../../server/db', {
  getOfferings: (eventId) => Promise.resolve([
    {id: 1, name: 'wine1', eventId: eventId},
    {id: 2, name: 'wine2', eventId: eventId}
  ]),
  getOffering: (id) => Promise.resolve(
    {id: id, name: 'beer ' + id, eventId: 1}
  ),
  createOffering: (newOffering, eventId) => Promise.resolve()
})

// This line must go after mocking out the database
const server = require('../../../server/server')

test('GET /events/:id/offerings returns all event offerings', t => {
  return request(server)
    .get('/api/v1/events/2/offerings')
    .expect(200)
    .then(res => {
      t.is(res.body.length, 2)
      t.deepEqual(res.body[1].name, 'wine2')
    })
    .catch(err => t.fail(err.message))
})

test('GET /offerings/:id returns a specific offering', t => {
  return request(server)
    .get('/api/v1/offerings/22')
    .expect(200)
    .then(res => {
      t.is(res.body.id, 22)
    })
    .catch(err => t.fail(err.message))
})

test('POST /events/:id/offerings creates a new event offering', t => {
  return request(server)
    .post('/api/v1/events/5/offerings')
    .send({name: 'test beverage'})
    .set('Authorization', `Bearer ${getToken()}`)
    .expect(201)
    .then(res => {
      t.pass()
    })
    .catch(err => t.fail(err.message))
})
