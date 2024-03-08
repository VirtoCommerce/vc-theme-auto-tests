import Lists_data from "../Account/Lists/Lists_data";
import ProductCard from "./ProductCard";


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

addToListAnonim(){

cy.log('User is Anonim');
cy.get('a[href="/sign-up"]').should('be.visible').and('have.text', 'Sign up now');

this.inActiveStateView('List');
cy.switchProductView('List');
this.activeStateView('List');

cy.get('button[type="button"][class="flex"]')
.eq(0)
.should('be.disabled');


ProductCard.isStarGrey();
  
this.inActiveStateView('Grid')
cy.switchProductView('Grid')
this.activeStateView('Grid')

cy.get('button[type="button"][class="flex"]')
.eq(0)
.should('be.disabled');

ProductCard.isStarGrey();

}

addToListAnonimProductPage(){

  //cy.get('[aria-describedby="popover-213"] > .w-full')
  cy.get('button[class="w-full py-4 hover:bg-[--color-neutral-50] disabled:bg-transparent text-[--color-neutral-300]"]')
  .should('be.visible')
  .and('be.disabled')  
  
}

addProductToNewList(){
  
cy.get('#headlessui-dialog-title-6 > .grow').should('be.visible').and('have.text', "Please select list");
cy.contains('button', " Add new list").click();
cy.get('input[type="checkbox"]').should('be.checked');   
cy.contains('.flex-wrap > .vc-button--color--primary', "Save")  
.should('be.enabled')
.click();
}

addToListFromProductPage(){

cy.get('button[class="w-full py-4 hover:bg-[--color-neutral-50] disabled:bg-transparent text-[--color-neutral-300]"]')
.should('be.visible')
.and('be.enabled')
.click();
this.addProductToNewList();
ProductCard.isStarOrange();
cy.checkNotificationBanner('Your lists were successfully updated');

}

addToList(){

cy.log('add product to list from List view')
this.inActiveStateView('List');
cy.switchProductView('List');
this.activeStateView('List');

ProductCard.isStarGrey();
  
cy.get('button[type="button"][class="flex"]')
.eq(0)
.click();
  
this.addProductToNewList();
cy.checkNotificationBanner('Your lists were successfully updated');
  
ProductCard.isStarOrange();

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

addToExistList(){

this.activeStateView('Grid');
this.inActiveStateView('List')
//ProductCard.isStarGrey();

cy.get('button[type="button"][class="flex"]')
.eq(0)
.click();

cy.get('#headlessui-dialog-title-6 > .grow').should('be.visible').and('have.text', "Please select list");
this.clickOnAllCheckbox();
cy.contains('.flex-wrap > .vc-button--color--primary', "Save")  
.should('be.enabled')
.click();

// Check the notification banner
cy.checkNotificationBanner('Your lists were successfully updated');

}

checkAlreadyInList(){
  
cy.get('button[type="button"][class="flex"]')
.eq(0)
.click(); 
cy.contains('h3', "Please select list").should('be.visible');
cy.get('div[class="bg-[color:var(--color-add-wishlist-modal-subtitle-bg)] px-6 py-3 text-15 font-bold leading-5 sm:py-2.5"]')
.should('have.text', "Already in the lists");
cy.get('ul li label input[type="checkbox"]').each(($checkbox) => {
cy.wrap($checkbox).should('be.checked');
});

cy.contains('button', "Cancel").click();

}

clickOnAllCheckbox(){

cy.get('ul.pt-2 li label input[type="checkbox"]').each(($checkbox) => {
// Check if the checkbox is not already checked
if (!$checkbox.prop('checked')) {
// Click the checkbox
cy.wrap($checkbox).click();

// Assert that the checkbox is checked after clicking
cy.wrap($checkbox).should('be.checked');
}
});
}

}

export default CatalogPage;
 