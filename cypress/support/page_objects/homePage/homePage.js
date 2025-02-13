//import homePageLocators from

//access homePageLocators

class HomePage {

    visit() {
        cy.visit(Cypress.env('baseUrl') + '/home')
    }

    

}