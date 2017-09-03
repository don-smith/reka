exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('events', table => {
    table.increments('id')
    table.string('name')
    table.string('location')
    table.string('description')
    table.string('offering_type')
    table.integer('user_id').references('users.id')
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTableIfExists('events')
}
