module.exports = {
  'Home page renders properly': function (browser) {
    const homePage = browser.page.home()

    homePage.navigate()
      .waitForElementPresent('@body')
      .assert.containsText('@header', 'REKA')

    browser.end()
  }
}
