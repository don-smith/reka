import request from 'supertest'

import { createTestToken } from 'authenticare/testing'

const testToken = createTestToken({
  id: 1,
  username: 'jules'
})

jest.mock('../../../server/db/offerings', () => ({
  getOfferings: (eventId) => Promise.resolve([
    { id: 1, name: 'wine1', eventId: eventId },
    { id: 2, name: 'wine2', eventId: eventId }
  ]),
  getOffering: (id) => Promise.resolve(
    { id: id, name: 'beer ' + id, eventId: 1 }
  ),
  createOffering: (newOffering, eventId) => Promise.resolve()
}))

// This line must go after mocking out the database
const server = require('../../../server/server')

test('GET /events/:id/offerings returns all event offerings', () => {
  return request(server)
    .get('/api/v1/events/2/offerings')
    .expect(200)
    .then(res => {
      expect(res.body.length).toBe(2)
      expect(res.body[1].name).toBe('wine2')
    })
    .catch(err => expect(err).toBeNull())
})

test('GET /offerings/:id returns a specific offering', () => {
  return request(server)
    .get('/api/v1/offerings/22')
    .expect(200)
    .then(res => {
      expect(res.body.id).toBe(22)
    })
    .catch(err => expect(err).toBeNull())
})

test('POST /events/:id/offerings creates a new event offering', () => {
  return request(server)
    .post('/api/v1/events/5/offerings')
    .send({ name: 'test beverage' })
    .set('Authorization', `Bearer ${testToken}`)
    .expect(201)
    .then(res => {
      expect(res).toBeDefined()
    })
    .catch(err => expect(err).toBeNull())
})
