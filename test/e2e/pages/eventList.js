'use strict'
/* global actor */

let I

const elements = {
  eventsContainer: '.events',
  hostedEvents: '.hosted li',
  attendedEvents: '.attended li',
  newEventButton: '.new pure-button'
}

module.exports = {
  _init () {
    I = actor()
  },

  clickNewEvent () {
    I.amOnPage('/events')
    I.click(elements.newEventButton)
  },

  clickEvent (type, num) {
    const eventSelector = `.${type} li:nth-child(${num}) a`
    I.click(eventSelector)
  },

  ...elements
}
