const username = 'jules'
const password = 'jules'

module.exports = {
  'User can sign in': browser => {
    const signinPage = browser.page.signin()
    const eventListPage = browser.page.eventList()

    signinPage.navigate()
      .waitForElementPresent('@headerHomeLink')
      .assert.elementPresent('@headerRegisterLink')
      .assert.elementNotPresent('@headerProfileLink')
      .assert.elementNotPresent('@headerEventsLink')
      .assert.elementNotPresent('@headerLogOffLink')
      .signin(username, password)
      .waitForElementPresent('@headerLogOffLink')
      .assert.elementPresent('@headerLogOffLink')
      .assert.elementPresent('@headerEventsLink')
      .assert.elementPresent('@headerProfileLink')
      .assert.elementNotPresent('@headerRegisterLink')
    eventListPage // signin page auto navigates to /events
      .assert.elementPresent('@eventsContainer')

    browser.end()
  }
}
