import headerLocators from "./headerLocators";

class Header {

    getSearchFieldinput() {
        return cy.get(headerLocators.searchFieldInput)
        .should('exist')
        .should('be.visible')
    }

    searchFieldInputText(text) {
        this.getSearchFieldinput()
        .type(text)
    }

    getSearchButton() {
        return cy.get(headerLocators.searchButton)
    }

    searchButtonClick() {
        this.getSearchButton()
        .click()
    }

    getCartIcon() {
        return cy.get(headerLocators.cartIcon)
        .should('exist')
        .should('be.visible')
        .should('not.be.disabled')
    }

    clickCartIcon() {
        this.getCartIcon()
        .click()
    }

    getCartContentIndex() {
        return cy.get(headerLocators.cartContentIndex, {timeout: 60000})
        .should('exist')
        .should('be.visible')
        .invoke('text')
    }

}

export default Header;