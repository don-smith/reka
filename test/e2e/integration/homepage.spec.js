describe('The homepage', () => {
  it('displpays the name of the application', () => {
    cy.visit('/')
    cy.contains('Reka')
  })
})
