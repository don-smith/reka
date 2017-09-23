const moment = require('moment')

exports.seed = function (knex, Promise) {
  return knex('events').insert([
    {
      id: 1,
      user_id: 1,
      date_time: moment('2017-08-08 19:30+12').toDate(),
      name: 'Jules on wine',
      location: '123 Happy Lane',
      description: 'Jules is having another wine tasting party',
      offering_type: 'wine'
    },
    {
      id: 2,
      user_id: 1,
      date_time: moment('2017-10-08 19:30+12').toDate(),
      name: 'Does Jules beer in the woods?',
      description: 'Jules is having her first beer tasting',
      location: '123 Yum Drive',
      offering_type: 'beer'
    },
    {
      id: 3,
      user_id: 2,
      date_time: moment('2017-10-08 19:30+12').toDate(),
      name: 'Jimmy and the chocolate factory',
      description: 'Once you go dark, you never go back',
      location: '123 Cocoa Road',
      offering_type: 'chocolate'
    }
  ])
}
