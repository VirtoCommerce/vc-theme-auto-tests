import {CheckoutFlowLocators} from "./CheckoutFlowLocators/CheckoutFlowLocators";
import testData from "./testData";
import TestData from "../../../e2e/Variables/TestData";


export class AnonymousCheckout {

  checkShippingPage(){

  cy.contains('h1', 'Shipping').should('be.visible'); 
  cy.location('pathname').should('eq', "/checkout/shipping");
  cy.get('.vc-steps__item').should('have.length', 5);
  cy.contains('Shipping');
    
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
    cy.get('.vc-dropdown-menu__trigger').should('be.visible');
    cy.get('.vc-select__button-content > .flex').should('contain.text'," Select a delivery method");
    cy.get('.vc-select__button').click();
    cy.get('ul[class="vc-dropdown-menu__list"]').should('be.visible');    
    cy.contains('span', method).click();
  }

  proceedToBilling() {
  cy.get(CheckoutFlowLocators.PROCEED_TO_BILLING).click();
  cy.contains('h1', 'Billing').should('be.visible'); 
  
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
  cy.contains('h1', 'Order review').should('be.visible'); 
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
  cy.contains('h3', 'Select address').should('be.visible'); 
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
    cy.get(CheckoutFlowLocators.PROCEED_TO_BILLING).should('not.be.disabled').click();
  }

  leaveComment(text) {
  cy.get('textarea').type(text);
  }

checkBillingPage(){
  
cy.location('pathname').should('eq', "/checkout/billing");
cy.get('.vc-steps__item').should('have.length', 5);
cy.contains('Billing');
    
}

 checkStepsNumber(){
  
  cy.location('pathname').should('eq', "/checkout/billing");
  cy.get('.vc-steps__item').should('have.length', 6);
  cy.contains('Payment');
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
  cy.contains('a', 'Review order').click();
  cy.contains('h1', 'Order review').should('be.visible'); 

}

placeOrder() {

cy.contains('button', 'Place order').click();
cy.checkLoading('.vc-loader-overlay__spinner');

}

checkPaymentPage(){

cy.url().should('include', '/checkout/payment');
cy.contains('h1', 'Payment').should('be.visible');
cy.get('.p-5 md:p-6').should('be.visible');
cy.contains('button', 'Pay now').should('be.visible');
  
 
}

fillCardForm(cardNumber, cvv, name = 'ELON MUSK', date = '1234') {
cy.get('div[class="vc-input vc-input--size--md"]').first().find('input').type(cardNumber);
cy.get('input[class="vc-input__input"]').eq(1).type(name);
cy.get('input[class="vc-input__input"]').eq(2).type(date);
cy.contains('div', 'Security Code').find('input').type(cvv);     
   
}

pay() {
cy.contains('button', 'Pay Now').click();
}

isPayed() {

cy.url().should('include', 'checkout/payment/success');    
}

checkCompletePage(){

cy.url().should('include', '/checkout/completed');
cy.contains('h1', 'Order completed');
cy.contains('a', "Home Page").should('be.visible');
cy.contains('a', 'Show order').should('be.visible').click();
cy.location().should((loc) => {
expect(loc.href).to.include('/account/orders/')
})


}

checkOrder(){
cy.contains('a', 'Show order').click();  
cy.location().should((loc) => {
expect(loc.href).to.include('/account/orders/')
})
}
}
