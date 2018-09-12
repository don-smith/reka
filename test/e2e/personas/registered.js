'use strict'
/* global actor */

const signinPage = require('../pages/signin')
const personifiedMethods = require('./personified-methods')

const actions = {
  signsin (username, password) {
    signinPage._init()
    signinPage.signin(username, password)
  }
}

module.exports = function () {
  return actor(Object.assign(actions, personifiedMethods))
}
