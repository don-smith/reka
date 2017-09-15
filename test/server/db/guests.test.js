const env = require('./test-environment')
const db = require('../../../server/db/guests')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getGuest returns a guest given their id', () => {
  return db.getGuest(3, testDb)
    .then(guest => {
      expect(guest.name).toBe('Jim')
      expect(guest.eventId).toBe(1)
    })
    .catch(err => expect(err).toBeNull())
})

test('getGuest returns undefined for a nonexistent guest id', () => {
  return db.getGuest(9999, testDb)
    .then(guest => {
      expect(guest).toBeFalsy()
    })
    .catch(err => expect(err).toBeNull())
})

test('getGuests returns all guests for an event', () => {
  return db.getGuests(2, testDb)
    .then(guests => {
      expect(guests.length).toBe(3)
      expect(guests[2].name).toBe('Janet')
    })
    .catch(err => expect(err).toBeNull())
})

test('createGuest creates a new guest for an event', () => {
  const eventId = 2
  const newGuest = {name: 'newtestguest'}
  const validateNewGuest = newIds => {
    const id = newIds[0]
    return db.getGuest(id, testDb)
      .then(guest => {
        expect(guest.eventId).toBe(eventId)
      })
  }
  return db.createGuest(newGuest, eventId, testDb)
    .then(validateNewGuest)
    .catch(err => expect(err).toBeNull())
})
