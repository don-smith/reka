import request from 'supertest'

import getToken from './get-token'

jest.mock('../../../server/db', () => ({
  getGuests: (eventId) => Promise.resolve([
    {id: 1, name: 'guest1', userId: 1, eventId: eventId},
    {id: 2, name: 'guest2', userId: 2, eventId: eventId}
  ]),
  getGuest: (id) => Promise.resolve(
    {id: id, name: 'host ' + id, userId: 4, eventId: 1}
  ),
  createGuest: (newGuest, eventId) => Promise.resolve()
}))

// This line must go after mocking out the database
const server = require('../../../server/server')

test('GET /events/:id/guests returns all of event guests', () => {
  return request(server)
    .get('/api/v1/events/2/guests')
    .expect(200)
    .then(res => {
      expect(res.body.length).toBe(2)
      expect(res.body[1].name).toBe('guest2')
    })
    .catch(err => expect(err).toBeNull())
})

test('GET /guests/:id returns a specific guest', () => {
  return request(server)
    .get('/api/v1/guests/44')
    .expect(200)
    .then(res => {
      expect(res.body.id).toBe(44)
    })
    .catch(err => expect(err).toBeNull())
})

test('POST /events/:id/guests creates a new event guests', () => {
  return request(server)
    .post('/api/v1/events/5/guests')
    .send({name: 'testname'})
    .set('Authorization', `Bearer ${getToken()}`)
    .expect(201)
    .then(res => {
      expect(res).toBeDefined()
    })
    .catch(err => expect(err).toBeNull())
})
