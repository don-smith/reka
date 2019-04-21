const env = require('./test-environment')
const db = require('../../../server/db/offerings')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getOffering returns an offering given its id', () => {
  return db.getOffering(5, testDb)
    .then(offering => {
      expect(offering.name).toBe('beer 2')
      expect(offering.eventId).toBe(2)
    })
})

test('getOffering returns undefined for a nonexistent offering id', () => {
  return db.getOffering(9999, testDb)
    .then(offering => {
      expect(offering).toBeFalsy()
    })
})

test('getOfferings returns all offerings at an event', () => {
  return db.getOfferings(2, testDb)
    .then(offerings => {
      expect(offerings.length).toBe(3)
      expect(offerings[1].name).toBe('beer 2')
      expect(offerings[1].photoUrl).toBe('/beer2.jpg')
      expect(offerings[1].description).toBe('Very nice beer')
    })
})

test('createOffering creates a new offering at an event', () => {
  const eventId = 2
  const newOffering = {
    registrationIds: [5],
    name: 'new offering',
    description: 'new description',
    photoUrl: '/new-offering.jpg'
  }
  const validateNewOffering = id => {
    return db.getOffering(id, testDb)
      .then(offering => {
        expect(offering.eventId).toBe(eventId)
        return id
      })
  }
  return db.createOffering(newOffering, eventId, testDb)
    .then(validateNewOffering)
})
