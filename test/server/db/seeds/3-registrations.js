exports.seed = (knex, Promise) => {
  return knex('registrations').insert([
    {id: 1, event_id: 1, name: 'John'},
    {id: 2, event_id: 1, name: 'Jane'},
    {id: 3, event_id: 1, name: 'Jim', user_id: 2},
    {id: 4, event_id: 2, name: 'Joanne'},
    {id: 5, event_id: 2, name: 'Johan'},
    {id: 6, event_id: 2, name: 'Janet', user_id: 3},
    {id: 7, event_id: 3, name: 'Julie', user_id: 1}
  ])
}
