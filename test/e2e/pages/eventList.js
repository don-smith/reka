const eventListCommands = {
  clickNewEvent () {
    return this
      .waitForElementPresent('@newEventButton')
      .click('@newEventButton')
  },
  clickEvent (type, num) {
    const eventSelector = `.${type} li:nth-child(${num}) a`
    return this
      .waitForElementPresent(eventSelector)
      .click(eventSelector)
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
