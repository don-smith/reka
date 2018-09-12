'use strict'
/* global actor */

let I

const elements = {
  guestNameInput: '.registration input[name=name]',
  registerButton: '.registration input[value=Register]',
  unregisterButton: '.registration input[value=Unregister]'
}

module.exports = {
  _init () {
    I = actor()
  },

  register (name) {
    I.fillField(elements.guestNameInput, name)
    I.click(elements.registerButton)
  },

  unregister () {
    I.click(elements.unregisterButton)
  },

  ...elements
}
