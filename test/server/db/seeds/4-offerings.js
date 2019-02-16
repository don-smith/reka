exports.seed = (knex, Promise) => {
  return knex('offerings').insert([
    {
      id: 1,
      event_id: 1,
      name: 'wine 1',
      description: 'Really good wine',
      photo_url: '/wine1.jpg'
    },
    {
      id: 2,
      event_id: 1,
      name: 'wine 2',
      description: 'Very nice wine',
      photo_url: '/wine2.jpg'
    },
    {
      id: 3,
      event_id: 1,
      name: 'wine 3',
      description: 'An okay wine',
      photo_url: '/wine3.jpg'
    },
    {
      id: 4,
      event_id: 2,
      name: 'beer 1',
      description: 'Really good beer',
      photo_url: '/beer1.jpg'
    },
    {
      id: 5,
      event_id: 2,
      name: 'beer 2',
      description: 'Very nice beer',
      photo_url: '/beer2.jpg'
    },
    {
      id: 6,
      event_id: 2,
      name: 'beer 3',
      description: 'An okay beer',
      photo_url: '/beer3.jpg'
    }
  ])
}
