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

isStarGrey(){

cy.get('.flex > .vc-icon > use')
.eq(5)
.should('have.css', 'color')
.and('eq', 'rgb(163, 163, 163)');
cy.log('The color of star is grey');

}

isStarOrange(){

cy.log('Check the color of a star after adding it to the list')
cy.get('.flex > .vc-icon > use')
.eq(5)
.should('have.css', 'color')
.and('eq', 'rgb(240, 173, 78)');
cy.log('The product was added to the list. The color of star is orange')

}

addToListAnonim(){

cy.log('User is Anonim');
cy.get('a[href="/sign-up"]').should('be.visible').and('have.text', 'Sign up now');

this.inActiveStateView('List');
cy.switchProductView('List');
this.activeStateView('List');

this.isStarGrey();
  
this.inActiveStateView('Grid')
cy.switchProductView('Grid')
this.activeStateView('Grid')
this.isStarGrey();


}

inActiveStateView(label){

cy.log('Check color if inActive')
cy.get('.space-x-2 > .text-primary')
.contains(label)
.should('have.css', 'color')
.and('eq', 'rgb(240, 173, 78)')

}

activeStateView(label){

cy.log('Check color if Active')
cy.get('.space-x-2 > .text-neutral-700')
.contains(label)
.should('have.css', 'color')
.and('eq', 'rgb(64, 64, 64)')

}

addToList(){

  cy.log('add product to list from List view')
  this.inActiveStateView('List');
  cy.switchProductView('List');
  this.activeStateView('List');

  this.isStarGrey();
  
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

 // Check the notification banner
  cy.get('.vc-notifications'). should('be.visible').and('have.text', "Your lists were successfully updated");
  cy.log('Banner is presented');
  cy.get('.vc-notifications__close-button').click();
  cy.get('.vc-notifications'). should('not.be.visible');
  cy.log('Banner is disappeared');
  
  this.isStarOrange();

  this.inActiveStateView('Grid')
  cy.switchProductView('Grid')
  this.activeStateView('Grid')

  //cy.wait(1000)
  cy.log('Check star from Grid View')
  cy.get('.flex > .vc-icon > use')
  .eq(7)
  .should('have.css', 'color')
  .and('eq', 'rgb(240, 173, 78)');
  cy.log('The product was added to the list. The color of star is orange')

}

}

export default CatalogPage;
 