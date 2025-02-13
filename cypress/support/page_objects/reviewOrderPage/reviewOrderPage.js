import reviewOrderPageLocators from "./reviewOrderPageLocators";

class ReviewOrderPage {

    getPlaceOrderButton() {
        return cy.get(reviewOrderPageLocators.placeOrderButton)
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
    }

    clickPlaceOrderbutton() {
        this.getPlaceOrderButton()
        .click()
    }

}

export default ReviewOrderPage;