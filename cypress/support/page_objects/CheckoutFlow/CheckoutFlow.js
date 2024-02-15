import {CheckoutFlowLocators} from "./CheckoutFlowLocators/CheckoutFlowLocators";
import testData from "./testData";
import TestData from "../../../e2e/Variables/TestData";


export class AnonymousCheckout {

  checkShippingPage(){

    cy.location('pathname').should('eq', "/checkout/shipping");
    cy.get('.vc-steps__item').should('have.length', 5);
    cy.contains('Shipping')
    
    }

 fillShippingAddress() {
    cy.get(CheckoutFlowLocators.SELECT_SHIPPING_ADDRESS_BUTTON).click();
    cy.contains('div', 'First Name').find('input').type(testData.shipping.firstName);
    cy.contains('div', 'Last Name').find('input').type(testData.shipping.lastName);
    cy.contains('div', 'Email').find('input').type(testData.shipping.email);
    cy.get(CheckoutFlowLocators.SELECT_COUNTRY_INPUT).click();
    cy.contains('li', testData.shipping.country).click();
    cy.contains('div', 'ZIP / Postal code').find('input').type(testData.shipping.postCode);
    cy.contains('div', 'City').find('input').type(testData.shipping.city);
    cy.contains('div', 'Address').find('input').type(testData.shipping.address);

    cy.contains('button', 'Create').click();
  }

  fillBillingAddress(){
    cy.get(CheckoutFlowLocators.SELECT_SHIPPING_ADDRESS_BUTTON).click();
    cy.contains('div', 'First Name').find('input').type(testData.shipping.firstName);
    cy.contains('div', 'Last Name').find('input').type(testData.shipping.lastName);
    cy.contains('div', 'Email').find('input').type(testData.shipping.email);
    cy.get(CheckoutFlowLocators.SELECT_COUNTRY_INPUT).click();
    cy.contains('li', testData.shipping.country).click();
    cy.contains('div', 'ZIP / Postal code').find('input').type(testData.shipping.postCode);
    cy.contains('div', 'City').find('input').type(testData.shipping.city);
    cy.contains('div', 'Address').find('input').type(testData.shipping.address);

    cy.contains('button', 'Create').click();
  }

  selectDelivery(method) {
    cy.contains('span', 'Select a delivery method').click();
    cy.contains('span', method).click();
  }

  proceedToBilling() {
    cy.get(CheckoutFlowLocators.PROCEED_TO_BILLING).click();
  }

  selectPaymentMethod(method) {
    cy.contains('span', 'Select a payment method').click();
    cy.contains('span', method).click();
  }

  reviewOrder() {
    cy.get(CheckoutFlowLocators.REVIEW_ORDER).click();
  }

  placeOrder() {
    cy.contains('span', 'Place order').click();
  }

  isCompleted() {
    cy.url().should('include', '/checkout/completed');
  }
}

export class PersonalCheckout {

  checkShippingPage(){

    cy.location('pathname').should('eq', "/checkout/shipping");
    cy.get('.vc-steps__item').should('have.length', 5);
    cy.contains('Shipping')
    
    }

  // There is no any address

    addNewShippingAddress(){

      cy.get('.vc-address-selection__link').should('have.text', 'select a shipping address').click();      
      //cy.get('.mx-auto').should('be.visible');      
      //cy.contains('button', 'Add new address').click();
      cy.contains('div', 'First Name').find('input').type(testData.shipping.firstName);
      cy.contains('div', 'Last Name').find('input').type(testData.shipping.lastName);
      cy.contains('div', 'Email').find('input').type(testData.shipping.email);
      cy.get(CheckoutFlowLocators.SELECT_COUNTRY_INPUT).click();
      cy.contains('li', testData.shipping.country).click();
      cy.contains('div', 'ZIP / Postal code').find('input').type(testData.shipping.postCode);
      cy.contains('div', 'City').find('input').type(testData.shipping.city);
      cy.contains('div', 'Address').find('input').type(testData.shipping.address);
  
      cy.contains('button', 'Create').click();
  
    }

  // Select shipping address if address has already added

  selectShippingAddress() {    
    cy.contains('button', 'select a shipping address').click();
    cy.get('.mx-auto').should('be.visible'); 
    cy.contains('button', 'Select').first().click();
    cy.contains('button', 'OK').click();   
    } 
  

  selectDelivery(method) {

    cy.get('.vc-dropdown-menu__trigger').should('be.visible');
    cy.get('.vc-select__button-content > .flex').should('contain.text'," Select a delivery method");
    cy.get('.vc-select__button').click();
    cy.get('ul[class="vc-dropdown-menu__list"]').should('be.visible');    
    cy.contains('span', method).click();
  }

  proceedToBilling() {
    cy.get(CheckoutFlowLocators.PROCEED_TO_BILLING).click();
  }

  leaveComment(text) {
    cy.get('textarea').type(text);
  }

checkBillingPage(){
  
cy.location('pathname').should('eq', "/checkout/billing");
cy.get('.vc-steps__item').should('have.length', 5);
cy.contains('Billing');
cy.get('input[type="checkbox"]').should('be.checked');
    
 }

  selectBillingAddress() {
    cy.contains('button', 'Select a billing address').click();
    cy.contains('button', 'Select').first().click();
    cy.contains('button', 'OK').click();
  }

  addNewBillingAddress(){

    cy.contains('button', 'Select a billing address').click();
    cy.wait(5000);
    //cy.contains('button', 'Add new address').click();
    cy.contains('div', 'First Name').find('input').type(testData.shipping.firstName);
    cy.contains('div', 'Last Name').find('input').type(testData.shipping.lastName);
    cy.contains('div', 'Email').find('input').type(testData.shipping.email);
    cy.get(CheckoutFlowLocators.SELECT_COUNTRY_INPUT).click();
    cy.contains('li', testData.shipping.country).click();
    cy.contains('div', 'ZIP / Postal code').find('input').type(testData.shipping.postCode);
    cy.contains('div', 'City').find('input').type(testData.shipping.city);
    cy.contains('div', 'Address').find('input').type(testData.shipping.address);

    cy.contains('button', 'Create').click();

  }

  selectPaymentMethod(method) {
  
    cy.get('.vc-dropdown-menu__trigger').should('be.visible');
    cy.get('.vc-select__button-content > .flex').should('contain.text'," Select a payment method");
    cy.get('.vc-select__button').click();
    cy.get('ul[class="vc-dropdown-menu__list"]').should('be.visible');    
    cy.contains('span', method).click();
  }

  reviewOrder() {
    cy.get(CheckoutFlowLocators.REVIEW_ORDER).click();
  }

  placeOrder() {
    cy.contains('button', 'Place order').click();
  }

  fillCardForm(cardNumber, cvv, name = 'ELON MUSK', date = '1234') {
    cy.get('div[class="vc-input vc-input--size--md"]').first().find('input').type(cardNumber);
    cy.contains('div', 'Security Code').find('input').type(cvv);
    cy.contains('div', 'Cardholder name').find('input').type(name);
    cy.contains('div', 'Expiration date').find('input').type(date);
  }

  pay() {
    cy.contains('button', 'Pay Now').click();
  }

  isPayed() {
    cy.url().should('include', 'checkout/payment/success');    
  }

  checkOrder(){
    cy.contains('a', 'Show order').click();  
    cy.location().should((loc) => {
      expect(loc.href).to.include('/account/orders/')
    })

  }
}
