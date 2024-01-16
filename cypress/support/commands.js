import AuthLogin from "./navigation/AuthLogin"


require('cypress-xpath');

import 'cypress-real-events/support'

Cypress.Commands.add('login', (email, password) => {
  cy.session(
    email,
    () => {
      AuthLogin.visitSignInPage()
      cy.location("pathname").should('eq', "/sign-in")
      cy.get('input[name=email]').type(email)
      cy.get('input[type=password]').type(`${password}`, { log: false })
      cy.get('button[type=submit]').click()
      cy.wait(1000)
      cy.url().should('include', '/catalog')

    },
    {
      validate: () => {
        cy.getCookie('XSRF-TOKEN').should('exist')
        cy.getCookie('INGRESSCOOKIE').should('exist')
      },
    }
  )
})

Cypress.Commands.add('checkLoading', locator => {
  cy.get(locator, { timeout: 5000 }).should('exist');
  cy.get(locator, { timeout: 5000 }).should('not.exist');
})

Cypress.Commands.add('proceedButtonDisabled', locator =>{
  cy.get(locator).should('be.disabled');
})

Cypress.Commands.add('proceedButtonEnabled', locator => {
  cy.get(locator).should('have.attr', 'disabled').and('exist');
 
})






