/* global Feature, Scenario */

Feature('The homepage is visible')

Scenario('to an anonymous user', (anonymousUser) => {
  anonymousUser.isOnPage('/')
  anonymousUser.sees('REKA', '.home .splash')
})
