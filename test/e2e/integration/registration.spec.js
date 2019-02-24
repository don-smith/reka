describe('The Registration page', () => {
  it('shows the registered user\'s name', () => {
    cy.login('jules', 'jules')
    cy.visit('/registrations/1')
    cy.get('#registration').contains('John')
  })
})
