exports.seed = (knex, Promise) => {
  return knex('hosts').insert([
    {id: 1, user_id: 1, name: 'Julie'}
  ])
}
