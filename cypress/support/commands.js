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
