import AuthLogin from "./navigation/AuthLogin";
//import  { CartPageLocators } from "./page_objects/CartPage/CartPageLocators/CartPageLocators";



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
        cy.window().then((win) => {
          const storedValue = win.localStorage.getItem('auth');
          cy.log(storedValue); // Log the retrieved value
        });        
      
      },
    }
  )
})

Cypress.Commands.add('checkLoading', (locator, timeout = 5000) => {
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

Cypress.Commands.add('clickOnButton', (buttonName) => {

cy.contains('button', buttonName).click();

})

Cypress.Commands.add('clickOnContinue', (buttonName) => {

cy.contains('a', buttonName).click();
cy.location('pathname').should('eq', "/catalog");
  
})

Cypress.Commands.add('confirmDelete', () => {

cy.get('h3').should('have.text', "Confirm Delete").and('be.visible');
cy.contains('.vc-button--color--danger', "Delete").click();
cy.wait(500);
cy.contains('h3', 'Confirm Delete').should('not.exist');
cy.log('The deletion completed');
    
})


Cypress.Commands.add('checkNotificationBanner', (bannerText)=>{
 
  cy.log('Check the notification banner');
  cy.scrollTo('top');
  cy.get('.notifications-host__item').should('be.visible').and('have.text', bannerText);
  cy.log('Banner is presented');
  cy.get('.vc-alert__close-button').click();
  cy.wait(1000);
  cy.get('.notifications-host__item').should('not.exist');
  cy.log('Banner is disappeared');
})

Cypress.Commands.add('checkAddingProductsToCart', () => {

cy.log('Check Adding products to cart result pop-up');
cy.get('h3').should('have.text', "Adding products to cart result").and('be.visible');
cy.get('a[href="/cart"]').should('contain.text', "View cart");
cy.contains('button', "Print").should('be.enabled');
cy.contains('button', "OK").should('be.enabled');

})

Cypress.Commands.add('checkLabel', (labelName) => {

cy.contains('span', labelName);
  
})
  

