exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('registration_offerings', table => {
    table.increments('id')
    table.integer('registration_id').references('registrations.id')
    table.integer('offering_id').references('offerings.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('registration_offerings')
}
