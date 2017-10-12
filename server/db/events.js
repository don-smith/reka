const connection = require('./connection')

module.exports = {
  getEvent,
  createEvent,
  getHostedEvents,
  getAttendedEvents
}

function createEvent (event, conn) {
  const db = conn || connection
  const newEvent = {
    name: event.name,
    user_id: event.userId,
    location: event.location,
    date_time: event.dateTime,
    description: event.description,
    offering_type: event.offeringType
  }
  return db('events')
    .insert(newEvent)
}

function getHostedEvents (id, conn) {
  const db = conn || connection
  return db('events')
    .select('id', 'name',
      'user_id as userId',
      'offering_type as offeringType',
      'location', 'description')
    .where('user_id', id)
}

function getAttendedEvents (id, conn) {
  const db = conn || connection
  return db('events')
    .join('registrations', 'event_id', 'events.id')
    .select('events.id as id', 'events.name',
      'events.user_id as userId',
      'offering_type as offeringType',
      'location', 'description')
    .where('registrations.user_id', id)
}

function getEvent (id, conn) {
  const db = conn || connection
  return db('events')
    .select(
      'id',
      'name',
      'description',
      'location',
      'user_id as userID',
      'date_time as dateTime',
      'offering_type as offeringType'
    )
    .where('id', id)
    .first()
}
