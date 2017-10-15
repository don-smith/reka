/* global Feature, Scenario */

Feature('Signed out user can sign in')

Scenario('with existing user', (signedOutUser) => {
  signedOutUser.signsin('jules', 'jules')
  signedOutUser.sees('Home', '.header')
  signedOutUser.sees('Events', '.header')
  signedOutUser.sees('Profile', '.header')
  signedOutUser.sees('Log off', '.header')
  signedOutUser.doesntSee('Register', '.header')
})
