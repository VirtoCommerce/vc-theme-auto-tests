import productsPageLocators from "./productsPageLocators";

class ProductsPage {

    getViewAllProductsButton() {
        return cy.get(productsPageLocators.viewAllProductsButton, {timeout: 30000})
        .should('be.visible')
        .should('not.be.disabled')
    }

    clickViewAllProductsButton() {
        this.getViewAllProductsButton()
        .click()
    }

    getFirstAvailableProduct() {
        return cy.get(productsPageLocators.firstAvailableProduct, {timeout: 30000})
        .should('exist')
    }

}

export default ProductsPage;