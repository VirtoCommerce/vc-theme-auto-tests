import checkoutShippingLocators from "./checkoutShippingLocators";

class CheckoutShippingPage {

    getSelectDeliveryMethodButton() {
        return cy.get(checkoutShippingLocators.selectDeliveryMethodButton, {timeout: 30000})
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .should('contain.text','Select a delivery method')
    }

    clickSelectDeliveryMethodButton() {
        this.getSelectDeliveryMethodButton()
        .click()
    }

    getDeliveryMethodOptionsDropDown() {
        return cy.get(checkoutShippingLocators.deliveryMethodOptionsDropDown, {timeout: 60000})
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
    }

    clickDeliveryMethodOption(number) {
        this.getDeliveryMethodOptionsDropDown()
        .eq(number)
        .click()
    }

    getProceedToBillingButton() {
        return cy.get(checkoutShippingLocators.proceedToBillingButton)
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .should('have.text','Proceed to billing')
    }

    clickProceedToCheckoutButton() {
        this.getProceedToBillingButton()
        .click()
    }
}

export default CheckoutShippingPage;