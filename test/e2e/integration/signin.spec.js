describe('The Signin page', () => {
  it('can be logged into', () => {
    cy.visit('/signin')
    cy.get('[data-e2e="username"]').type('jules')
    cy.get('[data-e2e="password"').type('jules')
    cy.get('[data-e2e="sign-in-button"]').click()
    cy.url().should('include', '/events')
  })
})
