import orderCompletedPageLocators from "./orderCompletedPageLocators";

class OrderCompletedPage {

    getOrderCompletedPageTitle() {
        return cy.get(orderCompletedPageLocators.orderCompletedPageTitle)
        .should('exist')
        .should('be.visible')
    }

}

export default OrderCompletedPage;