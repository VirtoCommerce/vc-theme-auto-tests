import { ProductPageLocators } from './Locations/ProductPageLocators'
class ProductPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.log('Step: Visited Login Page');
  }
  purchase() {
    cy.get(ProductPageLocators.ADD_TO_CART_BUTTON).click();
  }
}

export default ProductPage;
