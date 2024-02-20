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

cy.get('.vc-line-items').should('be.visible');
cy.get('.vc-line-items').should('exist');

  }

  checkout() {
    cy.get(CartPageLocators.CHECKOUT_BUTTON).click();
  }

  clearCart() {
    cy.get('button').contains('Clear cart').click();   
  }

  confirmClearCart(){
cy.contains('.grow', 'Clear cart').should('exist');
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

cy.log('Verifying cart is empty')
cy.wait(1000);
cy.get('span[class="relative"]').last().should('be.visible');
cy.get(CartPageLocators.HEADER_CART_LINK).find('.vc-badge')
.if('exist')
.then(() => {
  cy.get(CartPageLocators.HEADER_CART_LINK).click();
  cy.url().should('include', '/cart');
  this.cartLineItemsCheck();
  cy.scrollTo('bottom');
  cy.contains('button', 'Clear cart').click();
  cy.get('button').contains('Yes').click(); 
  cy.contains('h2', 'Your cart is empty').should('be.visible');
})
.else()
.then(() => {
  cy.log('Cart is empty')  
}) 
}

}

export default CartPage;
