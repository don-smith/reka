exports.seed = (knex, Promise) => {
  const empty = table => () => knex(table).del()
  return empty('guest_offerings')()
    .then(empty('offerings'))
    .then(empty('guests'))
    .then(empty('events'))
    .then(empty('hosts'))
}
