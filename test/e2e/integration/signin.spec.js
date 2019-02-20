describe('The Signin page', () => {
  it('can be logged into', () => {
    cy.visit('/signin')
    cy.get('#username').type('jules')
    cy.get('#password').type('jules')
    cy.get('#sign-in-button').click()
    cy.url().should('include', '/events')
  })
})
