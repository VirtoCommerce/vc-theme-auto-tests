import checkoutBillingPageLocators from "./checkoutBillingPageLocators";

class CheckoutBillingPage {

    getSelectPaymentMethodButton() {
        return cy.get(checkoutBillingPageLocators.selectPaymentMethodButton)
        .should('exist')
        .should('be.visible')
        .should('contain.text','Select a payment method')
    }

    clickSelectPaymentMethodButton() {
        this.getSelectPaymentMethodButton()
        .click()
    }

    getSelectPaymentMethodOptions() {
        return cy.get(checkoutBillingPageLocators.selectPaymentMethodOptions)
        .should('exist')
        .should('be.visible')
        .should('have.length', 2)
        .then(options => {
            cy.wrap(options[0]).should('have.text', 'Account billing');
            cy.wrap(options[1]).should('have.text', 'Credit card');
        }); 
    }

   getAccountBillingOption() {
        return cy.get(checkoutBillingPageLocators.accountBillingOption)
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
   }

   clickAccountBillingOption() {
        this.getAccountBillingOption()
        .click()
   }

   getReviewOrderButton() {
        return cy.get(checkoutBillingPageLocators.reviewOrderButton)
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
   }

   clickReviewOrderButton() {
        this.getReviewOrderButton()
        .click()
   }
}

export default CheckoutBillingPage;