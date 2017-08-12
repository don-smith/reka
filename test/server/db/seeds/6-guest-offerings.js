exports.seed = (knex, Promise) => {
  return knex('guest_offerings').insert([
    {id: 1, guest_id: 1, offering_id: 1},
    {id: 2, guest_id: 2, offering_id: 2},
    {id: 3, guest_id: 3, offering_id: 3},
    {id: 4, guest_id: 4, offering_id: 4},
    {id: 5, guest_id: 5, offering_id: 5},
    {id: 6, guest_id: 6, offering_id: 6}
  ])
}
