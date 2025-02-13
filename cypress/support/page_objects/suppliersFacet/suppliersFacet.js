import suppliersFacetLocators from "./suppliersFacetLocators";

class SuppliersFacet {

    getSuppliersFacetSearchField() {
        return cy.get(suppliersFacetLocators.supplierFacetSearchField, {timeout: 60000})
        .should('be.visible')
        .should('not.be.disabled')
    }

    inputTextSuppliersFacetSearchField(text) {
        this.getSuppliersFacetSearchField()
        .type(text)
    }

    getFilteredCheckBox(text) {
        return cy.get(suppliersFacetLocators.filteredCheckbox(text), {timeout: 60000})
        .should('be.visible')
        .should('not.be.disabled')
    }

    clickFilteredCheckBox(text) {
        suppliersFacetLocators.filteredCheckbox(text)
        .should('be.visible')
        .should('not.be.disabled')
        .click()
    }

};

export default SuppliersFacet;