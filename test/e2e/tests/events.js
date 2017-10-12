const username = 'jules'
const password = 'jules'
const guestName = 'Julie'

module.exports = {
  'User can register for an event': browser => {
    const signinPage = browser.page.signin()
    const eventListPage = browser.page.eventList()
    const eventDetails = browser.page.eventDetails()

    signinPage.navigate()
      .signin(username, password)
      .waitForElementPresent('@headerLogOffLink')
    eventListPage // signin page auto navigates to /events
      .clickEvent('hosted', 2) // not zero-based
      .waitForElementPresent('@eventsContainer')
    eventDetails
      .register(guestName)
      .assert.containsText('@lastGuest', guestName)

    browser.end()
  }
}
