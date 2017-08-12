const dbConn = require('./connection')

module.exports = {
  createEvent,
  getEvents,
  getEvent
}

function createEvent (event) {
  return dbConn('events')
    .insert(event)
}

function getEvents () {
  return dbConn('events')
    .select('id',
      'host_id as hostId',
      'offering_type as offeringType',
      'location')
}

function getEvent (id) {
  return dbConn('events')
    .select()
    .where('id', id)
}
