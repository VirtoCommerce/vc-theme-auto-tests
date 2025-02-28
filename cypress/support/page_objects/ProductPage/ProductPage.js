import { ProductPageLocators } from './Locations/ProductPageLocators'
class ProductPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.get('.vc-typography').should('be.visible');
    cy.get('.vc-layout__container').should('be.visible');
    cy.log('Step: Visited Product Page');
  }

  openProductPage(){
    cy.get('.vc-popover > .vc-popover__trigger > .my-px')
    .eq(0)
    .invoke('removeAttr', 'target')
    .click();
  }

  checkProductPage(){

  cy.get('.vc-typography').should('be.visible');
  cy.get('.vc-layout__container').should('be.visible');
  cy.log('Step: Visited Product Page');

  }
}

export default ProductPage;
