const connection = require('./connection')

module.exports = {
  getGuest,
  getGuests,
  createGuest,
  deleteGuest
}

function getGuest (id, conn) {
  const db = conn || connection
  return db('guests')
    .select('id', 'name', 'user_id as userId', 'event_id as eventId')
    .where('id', id)
    .first()
}

function getGuests (eventId, conn) {
  const db = conn || connection
  return db('guests')
    .select('id', 'name', 'user_id as userId', 'event_id as eventId')
    .where('event_id', eventId)
}

function createGuest (guest, eventId, conn) {
  const db = conn || connection
  const newGuest = {
    name: guest.name,
    user_id: guest.id,
    event_id: eventId
  }
  return db('guests')
    .insert(newGuest)
}

function deleteGuest (guestName, eventId, conn) {
  const db = conn || connection
  return db('guests')
    .delete()
    .where({
      name: guestName,
      event_id: eventId
    })
}
