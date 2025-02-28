import {CartPageLocators} from "./CartPageLocators/CartPageLocators";

class CartPage {
  visit() {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/cart`);
  }

  visitByCartClick() {
    cy.get(CartPageLocators.HEADER_CART_LINK).click();
  }

cartLineItemsCheck(){
cy.wait(1000);
cy.get(CartPageLocators.CART_LINE_ITEMS).should('be.visible');
cy.get(CartPageLocators.CART_LINE_ITEMS).should('exist');
cy.get(CartPageLocators.CART_LINE_ITEMS).its('length').should('be.greaterThan', 0);

  }

  checkout() {
  cy.get(CartPageLocators.CHECKOUT_BUTTON).eq(0).click();
  }

  clearCart() {
    cy.get('button').contains('Clear cart').click();
  }

confirmClearCart(){
cy.contains(CartPageLocators.DIALOG_TITLE, 'Clear cart').should('exist');
cy.get('button').contains('Yes').click();
}

isCleared() {

cy.log('Verifying cart is empty');
cy.get(CartPageLocators.EMPTY_CART_LAYOUT).should('be.visible');
cy.get(CartPageLocators.EMPTY_CART_CONTAINER).should('be.visible').and('contain', CartPageLocators.EMPTY_CART_MESSAGE);
cy.get(CartPageLocators.CONTINUE_SHOPPING_BUTTON).should('be.visible');
cy.log('Cart is empty');

}

  proceedButtonInactive(){

  cy.proceedButtonDisabled(CartPageLocators.CHECKOUT_BUTTON_DISABLED);
  }

  proceedButtonActive(){
    cy.proceedButtonEnabled(CartPageLocators.CHECKOUT_BUTTON);
  }

emptyOrNot(){

cy.log('Verifying cart is empty')
cy.wait(2000);
cy.get('span[class="relative"]').last().should('be.visible');
cy.wait(2000);
cy.get(CartPageLocators.HEADER_CART_LINK).find('.vc-badge')
.if('exist')
.then(() => {
  cy.get(CartPageLocators.HEADER_CART_LINK).click();
  cy.url().should('include', '/cart');
  this.cartLineItemsCheck();
  cy.scrollTo('bottom');
  cy.contains('button', 'Clear cart').click();
  cy.contains(CartPageLocators.DIALOG_TITLE, "Clear cart").should('be.visible');
  cy.clickOnButton('Yes');
  cy.contains('div', 'Your cart is empty').should('be.visible');
  cy.log('The cart is cleared');
})
.else()
.then(() => {
  cy.log('Cart is empty')
})
}

}

export default CartPage;
