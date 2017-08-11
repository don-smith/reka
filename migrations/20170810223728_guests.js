exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('guests', table => {
    table.increments('id')
    table.string('name')
    table.integer('event_id').references('events.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('guests')
}
