exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('guest_offerings', table => {
    table.increments('id')
    table.integer('guest_id').references('guests.id')
    table.integer('offering_id').references('offerings.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('guest_offerings')
}
