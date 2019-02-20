// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/v1/auth/signin',
    body: { username, password }
  })
    .then(res => {
      window.localStorage.setItem('token', res.body.token)
    })
})

Cypress.Commands.add('resetDb', () => {
  cy.exec('npm run db:reset')
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
