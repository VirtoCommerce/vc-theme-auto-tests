import ProductCard from "./ProductCard";
import { CatalogPageLocators } from "./CatalogLocators";


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

clickOnSingleStar(){

cy.get(CatalogPageLocators.STAR)
.eq(0)
.click();

}

clickOnStarFromPDP(){
 
cy.get(CatalogPageLocators.STAR).click();

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

cy.get('button[class="w-full py-4 hover:bg-[--color-neutral-50] disabled:bg-transparent text-[--color-neutral-300]"]')
.should('be.visible')
.and('be.disabled')  
  
}

addProductToNewList(){
  
cy.contains('h3', "Please select list").should('exist');
cy.get('.justify-between > .flex').should('be.visible');
cy.get('.justify-between > .flex')
.if('enabled')
.then(() => {
cy.contains('button', " Add new list").should('be.visible').click();
cy.get('input[type="checkbox"]').should('be.checked');   
cy.contains('.flex-wrap > .vc-button--color--primary', "Save")  
.should('be.enabled')
.click();
cy.contains('h3', "Please select list").should('not.exist'); 
cy.checkNotificationBanner('Your lists were successfully updated');
})
.else('disabled')
.then(() => {
cy.contains('.flex-wrap > .vc-button--color--primary', "Save")  
.should('be.disabled');
cy.contains('button', "Cancel").click();
cy.log('Add new list and Save buttons are disabled');

})

}

addToListFromListView(){

cy.log('add product to list from List view')
this.inActiveStateView('List');
cy.switchProductView('List');
this.activeStateView('List');

ProductCard.isStarGrey();
  
this.clickOnSingleStar();
  
this.addProductToNewList();
  
ProductCard.isStarOrange();

this.inActiveStateView('Grid')
cy.switchProductView('Grid')
this.activeStateView('Grid')

cy.log('Check star from Grid View') 
ProductCard.isStarOrange();

}

addToExistList(){

cy.contains('h3', "Please select list").should('exist');
this.clickOnAllCheckbox();
cy.contains('.flex-wrap > .vc-button--color--primary', "Save")  
.should('be.enabled')
.click();
cy.wait(500);
cy.contains('h3', "Please select list").should('not.exist');
// Check the notification banner
cy.checkNotificationBanner('Your lists were successfully updated');

}

checkAlreadyInList(){
  
cy.contains('h3', "Please select list").should('be.visible');
cy.get('div[class="bg-[color:var(--color-add-wishlist-modal-subtitle-bg)] px-6 py-3 text-15 font-bold leading-5 sm:py-2.5"]')
.should('have.text', "Already in the lists");
cy.get('ul li label input[type="checkbox"][aria-checked="true"]').each(($checkbox) => {
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

clickOnStars(){

cy.get(CatalogPageLocators.STAR).each(($star) => {

cy.wrap($star).click();
this.addProductToNewList();

})

cy.get('svg[class="vc-icon w-5 h-5 lg:w-4 lg:h-4 text-[--color-primary-500]"]').its('length')
.should('eql', 10);

}

openProductPage(){

cy.get('[aria-describedby] > .my-px')
.eq(0)
.invoke('removeAttr', 'target')
.click();

}

removeProductFromLists(){

cy.get('ul li label input[type="checkbox"][aria-checked="true"]').each(($checkbox) => {
cy.wrap($checkbox)
.uncheck()
.should('not.be.checked');
});

cy.contains('button', "Save").should('be.enabled').click();
cy.contains('h3', "Please select list").should('not.exist');
cy.checkNotificationBanner('Your lists were successfully updated');

}

allUnchecked(){

cy.get('ul li label input[type="checkbox"]').each(($checkbox) => {
cy.wrap($checkbox)
.should('not.be.checked');
});
cy.contains('button', "Cancel").click();
}
}

export default CatalogPage;
 