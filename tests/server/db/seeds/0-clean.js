exports.seed = (knex, Promise) => {
  const empty = table => () => knex(table).del()
  return empty('registration_offerings')()
    .then(empty('offerings'))
    .then(empty('registrations'))
    .then(empty('events'))
    .then(empty('users'))
}
