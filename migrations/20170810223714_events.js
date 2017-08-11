exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('events', table => {
    table.increments('id')
    table.integer('host_id').references('hosts.id')
    table.string('location')
    table.string('offering_type')
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTableIfExists('events')
}
