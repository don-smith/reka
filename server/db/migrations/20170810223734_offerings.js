exports.up = function (knex, Promise) {
  return knex.schema.createTable('offerings', table => {
    table.increments('id')
    table.string('name')
    table.string('description')
    table.string('photo_url')
    table.integer('event_id').references('events.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('offerings')
}
