const hash = require('../../../../server/auth/hash')

exports.seed = (knex, Promise) => {
  return Promise.all([
    hash.generate('jules'),
    hash.generate('jimbo'),
    hash.generate('janej')
  ]).then(([julesHash, jimboHash, janejHash]) => {
    return knex('users').insert([
      { id: 1, username: 'jules', hash: julesHash },
      { id: 2, username: 'jimbo', hash: jimboHash },
      { id: 3, username: 'janej', hash: janejHash }
    ])
  })
}
