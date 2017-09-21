const headerElements = require('./header-elements')

const signinCommands = {
  signin (username, password) {
    return this
      .waitForElementPresent('@usernameInput')
      .setValue('@usernameInput', username)
      .setValue('@passwordInput', password)
      .click('@signinButton')
  }
}

module.exports = {
  url: function () {
    return this.api.launch_url + '/signin'
  },
  commands: [signinCommands],
  elements: [
    headerElements,
    {
      usernameInput: '#username',
      passwordInput: '#password',
      signinButton: '.sign-in button'
    }
  ]
}
