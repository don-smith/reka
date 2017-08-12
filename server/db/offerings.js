const dbConn = require('./connection')

module.exports = {
  getOffering,
  getOfferings,
  createOffering
}

function getOffering (id) {
  return dbConn('offerings')
    .select('id', 'name', 'description',
      'photo_url as photoUrl', 'event_id as eventId')
    .where('id', id)
}

function getOfferings (eventId) {
  return dbConn('offerings')
    .select('id', 'name', 'description',
      'photo_url as photoUrl', 'event_id as eventId')
    .where('event_id', eventId)
}

function createOffering (offering, eventId) {
  const createGuestRelations = associate.bind(null, offering.guestIds)
  const newOffering = {
    name: offering.name,
    description: offering.description,
    photo_url: offering.photoUrl,
    event_id: eventId
  }
  return dbConn('offerings')
    .insert(newOffering)
    .then(createGuestRelations)
}

function associate (guestIds, newOfferingIds) {
  const promises = guestIds.map(guestId => {
    return dbConn('guest_offerings')
      .insert({
        guest_id: guestId,
        offering_id: newOfferingIds[0]
      })
  })
  return Promise.all(promises)
}
