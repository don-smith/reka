exports.seed = (knex, Promise) => {
  return knex('registration_offerings').insert([
    { id: 1, registration_id: 1, offering_id: 1 },
    { id: 2, registration_id: 2, offering_id: 2 },
    { id: 3, registration_id: 3, offering_id: 3 },
    { id: 4, registration_id: 4, offering_id: 4 },
    { id: 5, registration_id: 5, offering_id: 5 },
    { id: 6, registration_id: 6, offering_id: 6 }
  ])
}
