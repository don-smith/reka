const {createHost, getHosts, getHost} = require('./hosts')
const {createEvent, getEvents, getEvent} = require('./events')
const {createGuest, getGuests, getGuest} = require('./guests')
const {createOffering, getOfferings, getOffering} = require('./offerings')
const {createUser, userExists, getUserById, getUserByName, updateUser} = require('./users')

module.exports = {
  createHost,
  getHosts,
  getHost,
  createEvent,
  getEvents,
  getEvent,
  createGuest,
  getGuests,
  getGuest,
  createOffering,
  getOfferings,
  getOffering,
  createUser,
  userExists,
  getUserById,
  getUserByName,
  updateUser
}
