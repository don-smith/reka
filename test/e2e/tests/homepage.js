/* global Feature, Scenario */

Feature('The homepage is visible')

Scenario('to an anonymous user', (anonymousUser, homePage) => {
  anonymousUser.isOnPage('/')
  anonymousUser.sees('REKA', homePage.splash)
})
