const test = require('ava')

const db = require('../../../server/db/offerings')

require('./configure-environment')(test)

test('getOffering returns an offering given its id', t => {
  return db.getOffering(5, t.context.connection)
    .then(offering => {
      t.is(offering.name, 'beer 2', 'should return beer 2')
      t.is(offering.eventId, 2, 'should return event_id 2')
    })
    .catch(err => t.fail(err.message))
})

test('getOffering returns undefined for a nonexistent offering id', t => {
  return db.getOffering(9999, t.context.connection)
    .then(offering => {
      t.falsy(offering, 'should not return offering 9999')
    })
    .catch(err => t.fail(err.message))
})

test('getOfferings returns all offerings at an event', t => {
  return db.getOfferings(2, t.context.connection)
    .then(offerings => {
      t.is(offerings.length, 3, 'should return 3 offerings')
      t.is(offerings[1].name, 'beer 2', 'should return beer 2')
      t.is(offerings[1].photoUrl, '/beer2.jpg', 'should return photo url')
      t.is(offerings[1].description, 'Very nice beer', 'should return description')
    })
    .catch(err => t.fail(err.message))
})

test('createOffering creates a new offering at an event', t => {
  const eventId = 2
  const newOffering = {
    guestIds: [5],
    name: 'new offering',
    description: 'new description',
    photoUrl: '/new-offering.jpg'
  }
  const validateNewOffering = id => {
    return db.getOffering(id, t.context.connection)
      .then(offering => {
        t.is(offering.eventId, eventId, 'should create new offering id ' + id)
        return id
      })
  }
  return db.createOffering(newOffering, eventId, t.context.connection)
    .then(validateNewOffering)
    .catch(err => t.fail(err.message))
})
