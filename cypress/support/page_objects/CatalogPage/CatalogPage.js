class ProductPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.log('Step: Visited Catalog Page');
  }
  purchaseAll() {
    cy.get('button[title="Add to cart"]').then(buttons => {
      Array.from(buttons).forEach(button => {
        button.click();
      })
    })
  }
}

export default ProductPage;
