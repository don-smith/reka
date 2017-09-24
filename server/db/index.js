const {createOffering, getOfferings, getOffering} = require('./offerings')
const {createRegistration, getRegistrations, getRegistration, deleteRegistration} = require('./registrations')
const {createEvent, getEvent, getHostedEvents, getAttendedEvents} = require('./events')
const {createUser, userExists, getUserById, getUserByName, updateUser} = require('./users')

module.exports = {
  createEvent,
  getHostedEvents,
  getAttendedEvents,
  getEvent,
  createRegistration,
  deleteRegistration,
  getRegistrations,
  getRegistration,
  createOffering,
  getOfferings,
  getOffering,
  createUser,
  userExists,
  getUserById,
  getUserByName,
  updateUser
}
