import productCardLocators from "./productCardLocators";

class ProductCard {

    getPriceDisplay() {
        return cy.get(productCardLocators.priceDisplay, {timeout: 30000})
    }

    getPriceAlertMessage() {
        return cy.get(productCardLocators.priceAlertMessage)
    }

    verifyPriceAlertMessage () {
        /*
        Multiple interations are required to prevent
        Cypress from running into issues caused by DOM updates during the chain of commands
        */
        this.getPriceAlertMessage()
        .should('exist')
        .should('be.visible')
        .contains('PRICE:')

        this.getPriceAlertMessage()
        .contains(' Please click product or filter by one supplier')

        this.getPriceAlertMessage()
        .find(productCardLocators.priceAlertIcon)
        .should('exist')
    }

    getAddToCartButton() {
        return cy.get(productCardLocators.addToCartButton, {timeout: 30000})
    }

    verifyAddToCartButtonIsActive() {
        this.getAddToCartButton()
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .get(productCardLocators.addToCartIcon)
        .should('exist')
        .should('be.visible')
    }

    clickAddToCartOnTheAvailableProduct(number) {
        //add available product at the specified index
        return this.getPriceDisplay()
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
        .eq(number)
        .closest(productCardLocators.productCard)
        .find(productCardLocators.addToCartButton)
        .click()        
    }
    
}

export default ProductCard;