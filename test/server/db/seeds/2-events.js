exports.seed = function (knex, Promise) {
  return knex('events').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Jules on wine',
      location: '123 Happy Lane',
      description: 'Jules is having another wine tasting party',
      offering_type: 'wine'
    },
    {
      id: 2,
      user_id: 1,
      name: 'Does Jules beer in the woods?',
      description: 'Jules is having her first beer tasting',
      location: '123 Yum Drive',
      offering_type: 'beer'
    },
    {
      id: 3,
      user_id: 2,
      name: 'Jimmy and the chocolate factory',
      description: 'Once you go dark, you never go back',
      location: '123 Cocoa Road',
      offering_type: 'chocolate'
    }
  ])
}
