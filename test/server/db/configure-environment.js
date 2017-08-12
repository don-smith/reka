const getDbConn = require('knex')

const testConfig = require('../../../knexfile').test

module.exports = test => {
  // Create a separate in-memory database before each test
  // In our tests, we can get at the database as `t.context.db`
  test.beforeEach(t => {
    t.context.connection = getDbConn(testConfig)
    return t.context.connection.migrate.latest()
      .then(() => {
        return t.context.connection.seed.run()
      })
  })

  // Destroy the database connection after each test
  test.afterEach(t => {
    return t.context.connection.destroy()
  })
}
