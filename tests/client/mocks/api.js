jest.mock('../../../client/api', () => {
  const testToken = { id: 'test token id' }
  return {
    callApi: () => Promise.resolve({ body: { token: testToken } })
  }
})
