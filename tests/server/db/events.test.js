const env = require('./test-environment')
const db = require('../../../server/db/events')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getEvent returns an event given its id', () => {
  return db.getEvent(1, testDb)
    .then(event => {
      expect(event.location).toBe('123 Happy Lane')
    })
    .catch(err => expect(err).toBeNull())
})

test('getEvent returns undefined for a nonexistent event id', () => {
  return db.getEvent(9999, testDb)
    .then(event => {
      expect(event).toBeFalsy()
    })
    .catch(err => expect(err).toBeNull())
})

test('getUpcomingEvents returns all upcoming events', () => {
  const userId = 1
  return db.getUpcomingEvents(userId, testDb)
    .then(events => {
      expect(events.length).toBe(1)
      expect(events[0].location).toBe('123 Happy Lane')
    })
    .catch(err => expect(err).toBeNull())
})

test('getHostedEvents returns all hosted events', () => {
  const userId = 1
  return db.getHostedEvents(userId, testDb)
    .then(events => {
      expect(events.length).toBe(1)
      expect(events[0].location).toBe('123 Yum Drive')
    })
    .catch(err => expect(err).toBeNull())
})

test('getAttendedEvents returns all attended events', () => {
  const userId = 1
  return db.getAttendedEvents(userId, testDb)
    .then(events => {
      expect(events.length).toBe(1)
      expect(events[0].location).toBe('123 Cocoa Road')
    })
    .catch(err => expect(err).toBeNull())
})

test('createEvent creates a new event', () => {
  const newEvent = {
    host_id: 1,
    offering_type: 'chocolate',
    location: '987 Countdown Terrace'
  }
  const validateNewEvent = newIds => {
    const id = newIds[0]
    return db.getEvent(id, testDb)
      .then(event => {
        expect(event.location).toBe(newEvent.location)
      })
  }
  return db.createEvent(newEvent, testDb)
    .then(validateNewEvent)
    .catch(err => expect(err).toBeNull())
})
