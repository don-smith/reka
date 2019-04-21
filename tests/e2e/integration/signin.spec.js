describe('The Signin page', () => {
  it('can be logged into', () => {
    cy.visit('/signin')
    cy.get('[data-e2e="username"] input').type('jules')
    cy.get('[data-e2e="password"] input').type('jules')
    cy.get('[data-e2e="sign-in-button"]').click()
    cy.url().should('include', '/events')
  })
})
