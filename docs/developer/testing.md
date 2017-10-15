# Reka tests

  There are currently tests for:

  * API routes
  * database modules
  * User interface
  * Integration


## Running tests

  The [setup steps](setup.md) must be completed before the tests can be run.

  * `npm test` will run the unit tests for routes, database modules and UI components.
  * `npm run e2e` will run the integration tests.


## Unit tests

  * [Jest](https://facebook.github.io/jest) is used as both a test runner and assertion library.


## UI tests

  * [Enzyme](http://airbnb.io/enzyme) is used to render the components.
  * Includes tests for Redux actions and reducers.


## Integration tests

  * [Codecept](http://codeceptjs.io), which uses [Nightmare](http://www.nightmarejs.org), to run user acceptance tests that ensure integration throughout all layers of the app.
  * To run these tests: `npm run e2e`
  * To run these tests and see console.log calls: `npm run e2e:debug`
