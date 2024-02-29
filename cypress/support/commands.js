import AuthLogin from "./navigation/AuthLogin";
import  { CartPageLocators } from "./page_objects/CartPage/CartPageLocators/CartPageLocators";



require('cypress-xpath');

import 'cypress-if'
import 'cypress-real-events/support'
import 'cypress-testrail'

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

Cypress.Commands.add('checkLoading', (locator, timeout = 10000) => {
  cy.get(locator, {timeout}).should('exist');
  cy.get(locator, {timeout}).should('not.exist');
})

Cypress.Commands.add('proceedButtonDisabled', locator =>{
  cy.get(locator).should('be.disabled').invoke('prop', 'disabled', false);
})

Cypress.Commands.add('proceedButtonEnabled', locator => {
  cy.get(locator).should('not.be.disabled');
})

Cypress.Commands.add('digitalLabel', (locator) => {

cy.get(locator).contains('Digital product');

})

Cypress.Commands.add('digitalProductChipAbsent', (locator) => {

cy.get(locator).should('not.have.text', 'Digital product');
})


Cypress.Commands.add('switchProductView', (viewLabel) => {

cy.get('.space-x-2 > .text-primary')
.contains(viewLabel)
.click();
})

Cypress.Commands.add('addProductToList', ()=>{
  
  cy.get('#headlessui-dialog-title-6 > .grow').should('be.visible').and('have.text', "Please select list");
  cy.contains('button', " Add new list").click();
  cy.get('input[type="checkbox"]').should('be.checked');   
  cy.contains('.flex-wrap > .vc-button--color--primary', "Save")  
  .should('be.enabled')
  .click();
  
  // Check the notification banner
  cy.get('.vc-notifications'). should('be.visible').and('have.text', "Your lists were successfully updated");
  cy.log('Banner is presented');
  cy.get('.vc-notifications__close-button').click();
  cy.get('.vc-notifications'). should('not.be.visible');
  cy.log('Banner is disappeared');
})
  

