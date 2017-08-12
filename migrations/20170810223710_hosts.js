exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('hosts', table => {
    table.increments('id')
    table.string('name')
    table.integer('user_id').references('users.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('hosts')
}
