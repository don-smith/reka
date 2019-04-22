const { generateHash } = require('authenticare/server')

exports.seed = (knex, Promise) => {
  return Promise.all([
    generateHash('jules'),
    generateHash('jimbo'),
    generateHash('janej')
  ]).then(([julesHash, jimboHash, janejHash]) => {
    return knex('users').insert([
      { id: 1, username: 'jules', hash: julesHash },
      { id: 2, username: 'jimbo', hash: jimboHash },
      { id: 3, username: 'janej', hash: janejHash }
    ])
  })
}
