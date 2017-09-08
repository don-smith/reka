exports.up = function (knex, Promise) {
  return knex.schema.table('events', t => {
    t.dateTime('date_time')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('events', t => {
    t.dropColumn('date_time')
  })
}
