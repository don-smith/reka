const connection = require('./connection')

module.exports = {
  getRegistration,
  getRegistrations,
  createRegistration,
  deleteRegistration
}

function getRegistration (id, conn) {
  const db = conn || connection
  return db('registrations')
    .select('id', 'name', 'user_id as userId', 'event_id as eventId')
    .where('id', id)
    .first()
}

function getRegistrations (eventId, conn) {
  const db = conn || connection
  return db('registrations')
    .select('id', 'name', 'user_id as userId', 'event_id as eventId')
    .where('event_id', eventId)
}

function createRegistration (registration, eventId, conn) {
  const db = conn || connection
  const newRegistration = {
    name: registration.name,
    user_id: registration.id,
    event_id: eventId
  }
  return db('registrations')
    .insert(newRegistration)
}

function deleteRegistration (registrationName, eventId, conn) {
  const db = conn || connection
  return db('registrations')
    .delete()
    .where({
      event_id: eventId,
      name: registrationName
    })
}
