describe('The Signin page', () => {
  it('can be logged into', () => {
    cy.login('jules', 'jules')
    cy.url().should('include', '/events')
  })
})
