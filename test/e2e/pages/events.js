const eventListCommands = {
  clickNewEvent () {
    return this
      .waitForElementPresent('@newEventButton')
      .click('@newEventButton')
  }
}

module.exports = {
  url: function () {
    return this.api.launch_url + '/events'
  },
  commands: [eventListCommands],
  elements: [
    {
      eventsContainer: '.events',
      hostedEvents: '.hosted li',
      attendedEvents: '.attended li',
      newEventButton: '.new pure-button'
    }
  ]
}
