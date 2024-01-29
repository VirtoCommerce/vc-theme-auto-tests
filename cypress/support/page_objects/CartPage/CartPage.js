import {CartPageLocators} from "./CartPageLocators/CartPageLocators";
import CatalogPage from "../CatalogPage/CatalogPage";

class CartPage {
  visit() {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/cart`);
  }

  visitByCartClick() {
    cy.get(CartPageLocators.HEADER_CART_LINK).click();
  }

cartLineItemsCheck(){

cy.reload();
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

  proceedButtonInactive(){
    cy.proceedButtonDisabled(CartPageLocators.CHECKOUT_BUTTON_DISABLED);
  }

  proceedButtonActive(){
    cy.proceedButtonEnabled(CartPageLocators.CHECKOUT_BUTTON);
  }

emptyOrNot(){

  
cy.visit(`${Cypress.env('PLATFORM_URL')}/cart`);
cy.wait(1000);

// Check if the "Clear Cart" button exists

cy.contains('button', 'Clear cart')
.if('exist')
.then(() => {
  cy.get('button', 'Clear cart').click();
  cy.get('button').contains('Yes').click(); 
  cy.contains('h2', 'Your cart is empty').should('be.visible');
})
.else()
.then(() => {
  cy.log('Cart is empty')
  cy.go('back');
}) 
}

}

export default CartPage;
