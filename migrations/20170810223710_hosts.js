exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('hosts', table => {
    table.increments('id')
    table.string('name')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('hosts')
}
