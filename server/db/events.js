const connection = require('./connection')

module.exports = {
  createEvent,
  getEvents,
  getEvent
}

function createEvent (event, conn) {
  const db = conn || connection
  return db('events')
    .insert(event)
}

function getEvents (conn) {
  const db = conn || connection
  return db('events')
    .select('id',
      'host_id as hostId',
      'offering_type as offeringType',
      'location')
}

function getEvent (id, conn) {
  const db = conn || connection
  return db('events')
    .select()
    .where('id', id)
    .first()
}
