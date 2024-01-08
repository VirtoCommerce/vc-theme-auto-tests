import {CartPageLocators} from "./CartPageLocators/CartPageLocators";

class CartPage {
  visit() {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/cart`);
  }

  checkout() {
    cy.get(CartPageLocators.CHECKOUT_BUTTON).click();
  }

  clearCart() {
    cy.get('button').contains('Clear cart').click();
    cy.get('button').contains('Yes').click();
  }
}

export default CartPage;
