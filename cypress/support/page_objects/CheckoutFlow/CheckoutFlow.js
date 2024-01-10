import {CheckoutFlowLocators} from "./CheckoutFlowLocators/CheckoutFlowLocators";
import testData from "./testData";

export class AnonymousCheckout {
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
  selectShippingAddress() {
    cy.contains('button', 'select a shipping address').click();
    cy.contains('button', 'Select').click();
    cy.contains('button', 'OK').click();
  }

  selectDelivery(method) {
    cy.contains('span', 'Select a delivery method').click();
    cy.contains('span', method).click();
  }

  proceedToBilling() {
    cy.get(CheckoutFlowLocators.PROCEED_TO_BILLING).click();
  }

  leaveComment(text) {
    cy.get('textarea').type(text);

  }
}
