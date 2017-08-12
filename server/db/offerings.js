const connection = require('./connection')

module.exports = {
  getOffering,
  getOfferings,
  createOffering
}

function getOffering (id, conn) {
  const db = conn || connection
  return db('offerings')
    .select('id', 'name', 'description',
      'photo_url as photoUrl', 'event_id as eventId')
    .where('id', id)
    .first()
}

function getOfferings (eventId, conn) {
  const db = conn || connection
  return db('offerings')
    .select('id', 'name', 'description',
      'photo_url as photoUrl', 'event_id as eventId')
    .where('event_id', eventId)
}

function createOffering (offering, eventId, conn) {
  const db = conn || connection
  const createGuestRelations = associate.bind(null, offering.guestIds, db)
  const newOffering = {
    name: offering.name,
    description: offering.description,
    photo_url: offering.photoUrl,
    event_id: eventId
  }
  return db('offerings')
    .insert(newOffering)
    .then(createGuestRelations)

  // The associate function below is partially applied earlier in this function
  // (the first 2 parameters to be specific) and called createGuestRelations.
  // The third parameter is supplied by the knex insert function, which is an
  // array of the new IDs created during the insert. There will only be a single
  // ID in the array and this array is called newOfferingIds.
}

function associate (guestIds, db, newOfferingIds) {
  const newOfferingId = newOfferingIds[0]
  const promises = guestIds.map(guestId => {
    return db('guest_offerings')
      .insert({
        guest_id: guestId,
        offering_id: newOfferingId
      })
  })
  return Promise.all(promises).then(() => newOfferingId)
}
