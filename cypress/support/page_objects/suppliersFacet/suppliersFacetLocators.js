const suppliersFacetLocators = {

supplierFacetSearchField: 'input.vc-input__input[placeholder="Search Supplier"]',
filteredCheckbox: (text) => cy.contains('span', text).parents('button').find('input[type="checkbox"]'),
}

export default suppliersFacetLocators;