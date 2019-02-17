const connection = require('./connection')

module.exports = {
  getRegistration,
  getRegistrations,
  createRegistration,
  deleteRegistration
}

function getRegistration (id, db = connection) {
  return db('registrations')
    .select('id', 'name', 'user_id as userId', 'event_id as eventId')
    .where('id', id)
    .first()
}

function getRegistrations (eventId, db = connection) {
  return db('registrations')
    .select('id', 'name', 'user_id as userId', 'event_id as eventId')
    .where('event_id', eventId)
}

function createRegistration (registration, eventId, db = connection) {
  const newRegistration = {
    name: registration.name,
    user_id: registration.id,
    event_id: eventId
  }
  return db('registrations')
    .insert(newRegistration)
}

function deleteRegistration (registrationName, eventId, db = connection) {
  return db('registrations')
    .delete()
    .where({
      event_id: eventId,
      name: registrationName
    })
}
