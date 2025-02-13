import searchFieldDropDownLocators from "./searchFieldDropdownLocators"

class SearchFieldDropdown {

    getShowAllresultsButton() {
        return cy.get(searchFieldDropDownLocators.viewAllResultsButton, {timeout: 30000})
    }

    clickShowAllResultsButton() {
        this.getShowAllresultsButton()
        .should('be.visible')
        .click()
    }

}

 export default SearchFieldDropdown;