import request from 'supertest'

import { createTestToken } from 'authenticare/testing'

const testToken = createTestToken({
  id: 1,
  username: 'jules'
})

jest.mock('../../../server/db/registrations', () => ({
  getRegistrations: (userId) => Promise.resolve([{
    id: 1,
    name: 'John',
    userId: null,
    eventId: 1
  }, {
    id: 2,
    name: 'Jane',
    userId: null,
    eventId: 1
  }, {
    id: 3,
    name: 'Jim',
    userId: 2,
    eventId: 1
  }])
}))

jest.mock('../../../server/db/events', () => ({
  getUpcomingEvents: (userId) => Promise.resolve([{
    id: 1,
    name: 'test upcoming',
    userId: userId,
    offeringType: 'wine',
    location: 'test location',
    description: 'test description'
  }]),
  getHostedEvents: (userId) => Promise.resolve([{
    id: 1,
    name: 'test hosted',
    userId: userId,
    offeringType: 'wine',
    location: 'test location',
    description: 'test description'
  }]),
  getAttendedEvents: (userId) => Promise.resolve([{
    id: 1,
    name: 'test attended',
    userId: userId,
    offeringType: 'wine',
    location: 'test location',
    description: 'test description'
  }]),
  getEvent: (eventId) => Promise.resolve({
    id: eventId,
    name: 'test event',
    userId: 1,
    offeringType: 'wine',
    location: 'test location',
    description: 'test description'
  }),
  createEvent: (event) => Promise.resolve(event)
}))

// This line must go after mocking out the database
const server = require('../../../server/server')

test('GET /events returns all of the user\'s events', () => {
  return request(server)
    .get('/api/v1/events')
    .set('Authorization', `Bearer ${testToken}`)
    // .expect(200)
    .then(res => {
      expect(res.body.upcoming.length).toBe(1)
      expect(res.body.upcoming[0].name).toBe('test upcoming')
      expect(res.body.hosted.length).toBe(1)
      expect(res.body.hosted[0].name).toBe('test hosted')
      expect(res.body.attended.length).toBe(1)
      expect(res.body.attended[0].name).toBe('test attended')
    })
})

test('GET /events/:id returns the event details', () => {
  const theUserId = 1
  const theEventId = 1
  return request(server)
    .get(`/api/v1/events/${theEventId}`)
    .set('Authorization', `Bearer ${testToken}`)
    .expect(200)
    .then(res => {
      const {
        id, userId, name, offeringType, location, description
      } = res.body.details
      expect(id).toBe(theEventId)
      expect(userId).toBe(theUserId)
      expect(name).toBe('test event')
      expect(offeringType).toBe('wine')
      expect(location).toBe('test location')
      expect(description).toBe('test description')
      expect(res.body.registrations.length).toBe(3)
    })
})

test('POST /events returns HTTP status code 201', () => {
  const event = {
    userId: 1,
    name: 'test event',
    offeringType: 'wine',
    location: 'test location',
    description: 'test description'
  }

  return request(server)
    .post('/api/v1/events')
    .set('Authorization', `Bearer ${testToken}`)
    .send(event)
    .expect(201)
})
