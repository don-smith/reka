describe('The Events page', () => {
  it('shows events the user\'s upcoming events', () => {
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.get('#upcoming')
  })

  it('shows events the user has hosted in the past', () => {
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.get('#hosted')
  })

  it('shows events the user has attended in the past', () => {
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.get('#attended')
  })
})
