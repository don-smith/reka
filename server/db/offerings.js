const connection = require('./connection')

module.exports = {
  getOffering,
  getOfferings,
  createOffering
}

function getOffering (id, db = connection) {
  return db('offerings')
    .select('id', 'name', 'description',
      'photo_url as photoUrl', 'event_id as eventId')
    .where('id', id)
    .first()
}

function getOfferings (eventId, db = connection) {
  return db('offerings')
    .select('id', 'name', 'description',
      'photo_url as photoUrl', 'event_id as eventId')
    .where('event_id', eventId)
}

function createOffering (offering, eventId, db = connection) {
  const createRegistrationRelations = associate.bind(null, offering.registrationIds, db)
  const newOffering = {
    name: offering.name,
    description: offering.description,
    photo_url: offering.photoUrl,
    event_id: eventId
  }
  return db('offerings')
    .insert(newOffering)
    .then(createRegistrationRelations)

  // The associate function below is partially applied earlier in this function
  // (the first 2 parameters to be specific) and called createRegistrationRelations.
  // The third parameter is supplied by the knex insert function, which is an
  // array of the new IDs created during the insert. There will only be a single
  // ID in the array and this array is called newOfferingIds.
}

function associate (registrationIds, db, newOfferingIds) {
  const newOfferingId = newOfferingIds[0]
  const promises = registrationIds.map(registrationId => {
    return db('registration_offerings')
      .insert({
        registration_id: registrationId,
        offering_id: newOfferingId
      })
  })
  return Promise.all(promises).then(() => newOfferingId)
}
