describe('The Events page', () => {
  it('shows the user\'s upcoming events', () => {
    cy.server()
    cy.route('GET', '/api/v1/events').as('events')
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.wait('@events')
    cy.get('[data-e2e="upcoming"] a').contains('Jules on wine')
  })

  it('shows events the user has hosted in the past', () => {
    cy.server()
    cy.route('GET', '/api/v1/events').as('events')
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.wait('@events')
    cy.get('[data-e2e="hosted"] a').contains('beer in the woods')
  })

  it('shows events the user has attended in the past', () => {
    cy.server()
    cy.route('GET', '/api/v1/events').as('events')
    cy.login('jules', 'jules')
    cy.visit('/events')
    cy.wait('@events')
    cy.get('[data-e2e="attended"] a').contains('chocolate factory')
  })
})
