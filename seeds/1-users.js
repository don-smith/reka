exports.seed = (knex, Promise) => {
  return knex('users').insert([
    {id: 1, username: 'jules', hash: ''},
    {id: 2, username: 'jimbo', hash: ''},
    {id: 3, username: 'janej', hash: ''}
  ])
}
