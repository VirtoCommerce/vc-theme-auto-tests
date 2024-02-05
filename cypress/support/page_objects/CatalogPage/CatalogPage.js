class CatalogPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.log('Step: Visited Catalog Page');
  }
  purchaseAll() {

  let countAddToCart = null;
  cy.log('Add products to cart')
  cy.get('button[title="Add to cart"]').each(($addToCart) => {
  countAddToCart = $addToCart.length;
  cy.wrap($addToCart)
  .click();
 })
  
}

addToCart() {

cy.log('Add products to cart')

cy.get('button[title="Add to cart"]').each(($addToCart) => {
cy.wrap($addToCart)
.click();
cy.checkLoading('.vc-button__loader');
});

cy.log('Check button Update cart');
cy.get('button[title="Update cart"]').each(($updateCart) => {
cy.wrap($updateCart)
.should('be.visible')
.and('have.text', 'Update cart');
cy.log('The product was added to cart');

});

}

}

export default CatalogPage;
 