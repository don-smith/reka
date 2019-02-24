describe('The Events page', () => {
  it('shows the user\'s upcoming events', () => {
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.get('#upcoming a').contains('Jules on wine')
  })

  it('shows events the user has hosted in the past', () => {
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.get('#hosted a').contains('beer in the woods')
  })

  it('shows events the user has attended in the past', () => {
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.get('#attended a').contains('chocolate factory')
  })
})
