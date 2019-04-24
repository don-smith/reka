// Increase the timeout to 10 seconds because the database tests
// run migrations and seeds before each test and the passwords
// for the users in the users table are hashed during seeding.
jest.setTimeout(10000)
