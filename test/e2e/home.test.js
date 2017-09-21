module.exports = {
  'Home page renders properly': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementPresent('body', 1000)
      .assert.containsText('h1', 'REKA')
      .end()
  }
}
