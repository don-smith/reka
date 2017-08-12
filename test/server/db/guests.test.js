const test = require('ava')

const db = require('../../../server/db/guests')

require('./configure-environment')(test)

test('getGuest returns a guest given their id', t => {
  return db.getGuest(3, t.context.connection)
    .then(guest => {
      t.is(guest.name, 'Jim', 'should return Jim')
      t.is(guest.eventId, 1, 'should return event_id 1')
    })
    .catch(err => t.fail(err.message))
})

test('getGuest returns undefined for a nonexistent guest id', t => {
  return db.getGuest(9999, t.context.connection)
    .then(guest => {
      t.falsy(guest, 'should not return guest 9999')
    })
    .catch(err => t.fail(err.message))
})

test('getGuests returns all guests for an event', t => {
  return db.getGuests(2, t.context.connection)
    .then(guests => {
      t.is(guests.length, 3, 'should return 3 guests')
      t.is(guests[2].name, 'Janet', 'should return Janet')
    })
    .catch(err => t.fail(err.message))
})

test('createGuest creates a new guest for an event', t => {
  const eventId = 2
  const newGuest = {name: 'newtestguest'}
  const validateNewGuest = newIds => {
    const id = newIds[0]
    return db.getGuest(id, t.context.connection)
      .then(guest => {
        t.is(guest.eventId, eventId, 'should create new guest id ' + id)
      })
  }
  return db.createGuest(newGuest, eventId, t.context.connection)
    .then(validateNewGuest)
    .catch(err => t.fail(err.message))
})
