exports.seed = function (knex, Promise) {
  return knex('events').insert([
    {id: 1, host_id: 1, location: '123 Happy Lane', offering_type: 'wine'},
    {id: 2, host_id: 1, location: '123 Yum Drive', offering_type: 'beer'}
  ])
}
