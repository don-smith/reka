const env = require('./test-environment')
const db = require('../../../server/db/registrations')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getRegistration returns a registration given their id', () => {
  return db.getRegistration(3, testDb)
    .then(registration => {
      expect(registration.name).toBe('Jim')
      expect(registration.eventId).toBe(1)
    })
    .catch(err => expect(err).toBeNull())
})

test('getRegistration returns undefined for a nonexistent registration id', () => {
  return db.getRegistration(9999, testDb)
    .then(registration => {
      expect(registration).toBeFalsy()
    })
    .catch(err => expect(err).toBeNull())
})

test('getRegistrations returns all registrations for an event', () => {
  return db.getRegistrations(2, testDb)
    .then(registrations => {
      expect(registrations.length).toBe(3)
      expect(registrations[2].name).toBe('Janet')
    })
    .catch(err => expect(err).toBeNull())
})

test('createRegistration creates a new registration for an event', () => {
  const eventId = 2
  const newRegistration = {name: 'newtestregistration'}
  const validateNewRegistration = newIds => {
    const id = newIds[0]
    return db.getRegistration(id, testDb)
      .then(registration => {
        expect(registration.eventId).toBe(eventId)
      })
  }
  return db.createRegistration(newRegistration, eventId, testDb)
    .then(validateNewRegistration)
    .catch(err => expect(err).toBeNull())
})
