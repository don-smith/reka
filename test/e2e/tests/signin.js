/* global Feature, Scenario */

Feature('Signed out user can sign in')

Scenario('with existing user', (signedOutUser, homePage) => {
  signedOutUser.signsin('jules', 'jules')
  signedOutUser.sees('Home', homePage.header)
  signedOutUser.sees('Events', homePage.header)
  signedOutUser.sees('Profile', homePage.header)
  signedOutUser.sees('Log off', homePage.header)
  signedOutUser.doesntSee('Register', homePage.header)
})
