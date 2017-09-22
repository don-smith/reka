# Reka tests

There are currently tests for:

  * API routes
  * database modules
  * React components


## Running tests

The [setup steps](setup.md) must be completed before the tests can be run.

* `npm test` will run the unit tests for routes, database modules and UI components.
* `npm run e2e` will run the integration tests.

If you want the tests to be run before each commit, and prevent the commit if any tests are failing, complete the optional `npm run add-pre-commit-hook` step just once during the initial setup.


## Unit tests

[Jest](https://facebook.github.io/jest) is used as both a test runner and assertion library.


## UI tests

[Enzyme](http://airbnb.io/enzyme) is used to render the components.


## Integration tests

[Nightwatch](http://nightwatchjs.org) uses the WebDriver API and a Selenium server to drive Chrome to run user scenarios.

These tests are written in ES6 (with the help of `babel-register`) and use [page objects](http://nightwatchjs.org/guide#page-objects) and [`assert`](http://nightwatchjs.org/api#assertions), but does not use the [`expect`](http://nightwatchjs.org/api#expect-api) assertions.

These tests require an additional installation step listed in [setup](setup.md).

