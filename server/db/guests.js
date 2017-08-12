const dbConn = require('./connection')

module.exports = {
  getGuest,
  getGuests,
  createGuest
}

function getGuest (id) {
  return dbConn('guests')
    .select('id', 'name', 'event_id as eventId')
    .where('id', id)
}

function getGuests (eventId) {
  return dbConn('guests')
    .select('id', 'name', 'event_id as eventId')
    .where('event_id', eventId)
}

function createGuest (guest, eventId) {
  const newGuest = {
    name: guest.name,
    event_id: eventId
  }
  return dbConn('guests')
    .insert(newGuest)
}
