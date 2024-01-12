import {CartPageLocators} from "./CartPageLocators/CartPageLocators";

class CartPage {
  visit() {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/cart`);
  }

  visitByCartClick() {
    cy.get(CartPageLocators.HEADER_CART_LINK).click();
  }

  cartLineItemsCheck(){

cy.checkLoading('.vc-loader-overlay__spinner');
cy.wait(5000);
cy.get('.vc-line-items').should('exist');

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
    cy.get(CartPageLocators.HEADER_CART_LINK).find('.vc-badge').should('not.exist');   
  }
}

export default CartPage;
