import request from 'supertest'

import { createTestToken } from 'authenticare/testing'

const testToken = createTestToken({
  id: 1,
  username: 'jules'
})

jest.mock('../../../server/db/registrations', () => ({
  getRegistrations: (eventId) => Promise.resolve([
    { id: 1, name: 'registration1', userId: 1, eventId: eventId },
    { id: 2, name: 'registration2', userId: 2, eventId: eventId }
  ]),
  getRegistration: (id) => Promise.resolve(
    { id: id, name: 'host ' + id, userId: 4, eventId: 1 }
  ),
  createRegistration: (newRegistration, eventId) => Promise.resolve(),
  deleteRegistration: (registrationName, eventId) => Promise.resolve()
}))

// This line must go after mocking out the database
const server = require('../../../server/server')

test('GET /events/:id/registrations returns all event registrations', () => {
  return request(server)
    .get('/api/v1/events/2/registrations')
    .expect(200)
    .then(res => {
      expect(res.body.length).toBe(2)
      expect(res.body[1].name).toBe('registration2')
    })
    .catch(err => expect(err).toBeNull())
})

test('GET /registrations/:id returns a specific registration', () => {
  return request(server)
    .get('/api/v1/registrations/44')
    .expect(200)
    .then(res => {
      expect(res.body.id).toBe(44)
    })
    .catch(err => expect(err).toBeNull())
})

test('POST /events/:id/registrations creates a new event registration', () => {
  return request(server)
    .post('/api/v1/events/5/registrations')
    .send({ name: 'testname' })
    .expect(201)
    .then(res => {
      expect(res).toBeDefined()
    })
    .catch(err => expect(err).toBeNull())
})

test('DELETE /events/:id/registrations deletes an event registration', () => {
  return request(server)
    .del('/api/v1/events/1/registrations')
    .send({ name: 'John' })
    .set('Authorization', `Bearer ${testToken}`)
    .expect(204)
    .then(res => {
      expect(res).toBeDefined()
    })
    .catch(err => expect(err).toBeNull())
})
