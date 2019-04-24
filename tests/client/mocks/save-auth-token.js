jest.mock('authenticare/client', () => {
  return {
    register: () => Promise.resolve({ id: 1 }),
    signIn: () => Promise.resolve({ id: 1 })
  }
})
