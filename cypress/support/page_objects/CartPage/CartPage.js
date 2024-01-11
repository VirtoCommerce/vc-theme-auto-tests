import {CartPageLocators} from "./CartPageLocators/CartPageLocators";

class CartPage {
  visit() {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/cart`);
  }

  visitByCartClick() {
    cy.get(CartPageLocators.HEADER_CART_LINK).click();
  }

  checkout() {
    cy.get(CartPageLocators.CHECKOUT_BUTTON).click();
  }

  clearCart() {
    cy.get('button').contains('Clear cart').click();   
  }

  confirmClearCart(){
cy.contains('#headlessui-dialog-title-6', 'Clear cart').should('exist');
cy.get('button').contains('Yes').click();
  }

  isCleared() {
    cy.contains('h2', 'Your cart is empty').should('be.visible');
    cy.get('.vc-badge__content').should('not.exist');
  }
}

export default CartPage;
