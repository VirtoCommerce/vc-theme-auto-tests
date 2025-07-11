import { ProductPageLocators } from './Locations/ProductPageLocators'

class ProductPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.get('.vc-typography').should('be.visible');
    cy.get('.vc-layout__container').should('be.visible');
    cy.log('Step: Visited Product Page');
  }

  openProductPage(){
    cy.get(ProductPageLocators.PRODUCT_TITLE)
    .eq(0)
    .click();
  }

  checkProductPage(){

  cy.get('.vc-typography').should('be.visible');
  cy.get('.vc-layout__container').should('be.visible');
  cy.log('Step: Visited Product Page');

  }
}

export default ProductPage;
