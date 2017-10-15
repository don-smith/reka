'use strict'
/* global actor */

module.exports = function () {
  return actor({
    isOnPage: function () {
      this.amOnPage.apply(this, Array.from(arguments))
    },
    sees: function () {
      this.see.apply(this, Array.from(arguments))
    },
    doesntSee: function () {
      this.dontSee.apply(this, Array.from(arguments))
    }
  })
}
