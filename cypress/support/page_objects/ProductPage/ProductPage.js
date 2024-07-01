import { ProductPageLocators } from './Locations/ProductPageLocators'
class ProductPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.log('Step: Visited Product Page');
  }

  purchase() {
  cy.get(ProductPageLocators.ADD_TO_CART_BUTTON).should('be.visible').click();
  }
}

export default ProductPage;
