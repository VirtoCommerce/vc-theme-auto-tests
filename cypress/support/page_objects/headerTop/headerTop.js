import headerTopLocators from "./headerTopLocators";

class HeaderTop {

    getUserContactButton() {
        return cy.get(headerTopLocators.userContactButton)
        .should('exist')
        .should('be.visible')
    }

    getLogoutButton() {
        return cy.get(headerTopLocators.logoutButton)
        .should('exist')
        .should('be.visible')
    }

    userContactButtonClick() {
        this.getUserContactButton()
        .click()
    }

    logoutButtonClick() {
        this.getLogoutButton()
        .click()
    }

}

export default HeaderTop;