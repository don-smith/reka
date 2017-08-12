const test = require('ava')

const db = require('../../../server/db/events')

require('./configure-environment')(test)

test('getEvent returns an event given its id', t => {
  return db.getEvent(1, t.context.connection)
    .then(event => {
      t.is(event.location, '123 Happy Lane', 'should return Happy Lane')
    })
    .catch(err => t.fail(err.message))
})

test('getEvent returns undefined for a nonexistent event id', t => {
  return db.getEvent(9999, t.context.connection)
    .then(event => {
      t.falsy(event, 'should not return event 9999')
    })
    .catch(err => t.fail(err.message))
})

test('getEvents returns all events', t => {
  return db.getEvents(t.context.connection)
    .then(events => {
      t.is(events.length, 2, 'should return 1 events')
      t.is(events[1].location, '123 Yum Drive', 'should return Yum Drive')
    })
    .catch(err => t.fail(err.message))
})

test('createEvent creates a new event', t => {
  const newEvent = {
    host_id: 1,
    offering_type: 'chocolate',
    location: '987 Countdown Terrace'
  }
  const validateNewEvent = newIds => {
    const id = newIds[0]
    return db.getEvent(id, t.context.connection)
      .then(event => {
        t.is(event.location, newEvent.location, 'should create event id ' + id)
      })
  }
  return db.createEvent(newEvent, t.context.connection)
    .then(validateNewEvent)
    .catch(err => t.fail(err.message))
})
