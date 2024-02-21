class CatalogPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.log('Step: Visited Catalog Page');
  }
  purchaseAll() {

  cy.log('Add products to cart')
  cy.get('button[title="Add to cart"]').each(($addToCart) => {
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

addToListAnonim(label){

  cy.log('User is Anonim');
  cy.get('a[href="/sign-up"]').should('be.visible').and('have.text', 'Sign up now');
  cy.get('.space-x-2 > .text-primary').contains(label).click();

  cy.get('.flex > .vc-icon > use')
  .eq(5)
  .should('have.css', 'color')
  .and('eq', 'rgb(163, 163, 163)');
  cy.log('The color of star is grey');
  
  cy.contains('span' , "Grid").click();
  cy.log('Check star from Grid View')
  cy.get('.flex > .vc-icon > use')
  .eq(5)
  .should('have.css', 'color')
  .and('eq', 'rgb(163, 163, 163)');
  cy.log('The color of star is grey');

}

addToList(label){

  cy.log('add product to list from List view')
  cy.get('.space-x-2 > .text-primary').contains(label).click();

  cy.get('.flex > .vc-icon > use')
  .eq(5)
  .should('have.css', 'color')
  .and('eq', 'rgb(163, 163, 163)');
  cy.log('The color of star is grey');
  
  cy.get('.flex > .vc-icon > use')
  .eq(5)
  .click();
  
  cy.get('#headlessui-dialog-title-6 > .grow').should('be.visible').and('have.text', "Please select list");
  cy.contains('button', " Add new list").click();
  cy.get('input[type="checkbox"]').should('be.checked');
  cy.get('button[type="button"]')
  .eq(76)
  .should('have.text', "Save")
  .and('be.enabled')
  .click();

  cy.get('.vc-notifications'). should('be.visible').and('have.text', "Your lists were successfully updated");
  cy.log('Banner is presented');
  cy.get('.vc-notifications__close-button').click();
  cy.get('.vc-notifications'). should('not.be.visible');
  cy.log('Banner is disappeared');
  
  cy.log('Check the color of a star after adding it to the list')
  cy.get('.flex > .vc-icon > use')
  .eq(5)
  .should('have.css', 'color')
  .and('eq', 'rgb(240, 173, 78)');
  cy.log('The product was added to the list. The color of star is orange')

  cy.contains('span' , "Grid").click();
  cy.wait(1000)
  cy.log('Check star from Grid View')
  cy.get('.flex > .vc-icon > use')
  .eq(7)
  .should('have.css', 'color')
  .and('eq', 'rgb(240, 173, 78)');
  cy.log('The product was added to the list. The color of star is orange')

}

}

export default CatalogPage;
 