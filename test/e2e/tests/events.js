'use strict'
/* global Feature, Scenario */

const username = 'jules'
const password = 'jules'
const guestName = 'Julie'

Feature('Can register for their event')

Scenario('as a host', (registeredUser, eventListingPage, eventDetails) => {
  registeredUser.signsin(username, password)
  eventListingPage.clickEvent('hosted', 2)
  registeredUser.sees('Events', eventDetails.header)
  eventDetails.register(guestName)
  // add assertions
})

Feature('Can unregister for their event')

Scenario('as a host', (registeredUser, eventListingPage, eventDetails) => {
  registeredUser.signsin(username, password)
  eventListingPage.clickEvent('hosted', 2)
  registeredUser.sees('Events', eventDetails.header)
  eventDetails.unregister()
  // add assertions
})
