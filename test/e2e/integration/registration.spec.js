describe('The Registration page', () => {
  it('shows the registered user\'s name', () => {
    cy.server()
    cy.route('GET', '/api/v1/events/*').as('event')
    cy.login('jules', 'jules')
    cy.visit('/registrations/1')
    cy.wait('@event')
    cy.get('[data-e2e="registration"]').contains('John')
  })
})
