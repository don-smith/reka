const eventDetailsCommands = {
  register (name) {
    return this
      .waitForElementPresent('@guestNameInput')
      .setValue('@guestNameInput', name)
      .click('@registerButton')
  },
  unregister () {
    return this
      .waitForElementPresent('@unregisterButton')
      .click('@unregisterButton')
  }
}

module.exports = {
  url: function () {
    return this.api.launch_url + '/events/2'
  },
  commands: [eventDetailsCommands],
  elements: [
    {
      eventListContainer: '.event-details',
      guestNameInput: '.registration input[name=name]',
      registerButton: '.register input[type=submit]',
      unregisterButton: '.unregister input[type=submit]',
      lastGuest: '.guests'
    }
  ]
}
