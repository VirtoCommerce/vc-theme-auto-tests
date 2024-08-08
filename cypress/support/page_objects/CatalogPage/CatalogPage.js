import ProductCard from "./ProductCard";
import { CatalogPageLocators } from "./CatalogLocators";

const BUY_BUTTONS = 'button[title="Add to cart"]:not([disabled])'

class CatalogPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.log('Step: Visited Catalog Page');

  }

  purchaseAll(amount = 100) {
    cy.log('Add products to cart')
    cy.get(BUY_BUTTONS)
      .should("not.be.disabled")
      .invoke("slice", 0, amount)
      .each(($addToCart) => {
        cy.wrap($addToCart).click();
        cy.checkLoading('.vc-button__loader');
    })
  }

addToCart(amount = 100) {

cy.log('Add products to cart')

cy.get(BUY_BUTTONS)
  .should("not.be.disabled")
  .invoke("slice", 0, amount)
  .each(($addToCart) => {
    cy.wrap($addToCart).click();
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

inActiveStateView(){

cy.log('Check color if inActive')
cy.get('button[class="flex rounded p-2 text-primary hover:text-primary-600')
.should('have.class', 'text-primary')

}

activeStateView(){

cy.log('Check color if Active')
cy.get('button[class="flex rounded p-2 cursor-auto bg-additional-50 text-neutral-700 hover:shadow-md"]')
.should('have.class', 'text-neutral-700')

}

clickOnSingleStar(){

cy.get(CatalogPageLocators.STAR)
.eq(0)
.click();

}

clickOnStarFromPDP(){

cy.get(CatalogPageLocators.STAR).last().click();

}

addToListAnonim(){

cy.log('User is Anonim');
cy.contains('a', "Sign up now").should('be.visible');

this.inActiveStateView();
cy.switchProductView('List');
this.activeStateView();

cy.get('button[type="button"][class="flex"]')
.eq(0)
.should('be.disabled');


ProductCard.isStarGrey();

this.inActiveStateView()
cy.switchProductView('Grid')
this.activeStateView()

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
cy.wait(500);
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
this.inActiveStateView();
cy.switchProductView('List');
this.activeStateView();

ProductCard.isStarGrey();

this.clickOnSingleStar();

this.addProductToNewList();

ProductCard.isStarOrange();

this.inActiveStateView()
cy.switchProductView('Grid')
this.activeStateView()

cy.log('Check star from Grid View')
ProductCard.isStarOrange();

}

addToExistList(){

cy.contains('h3', "Please select list").should('exist');
this.clickOnAllCheckbox();
cy.wait(500);
cy.contains('.flex-wrap > .vc-button--color--primary', "Save")
.should('be.enabled')
.click();
cy.wait(500);
cy.contains('h3', "Please select list").should('not.exist');
// Check the notification banner
cy.checkNotificationBanner('Your lists were successfully updated');

}

addProductsToExistList(){

cy.get(CatalogPageLocators.STAR).each(($star) => {
cy.wrap($star).click();
this.addToExistList();

})

}

checkAlreadyInList(){

cy.contains('h3', "Please select list").should('be.visible');
cy.get('div[class="bg-neutral-100 px-6 py-3 text-base font-bold leading-5 sm:py-2.5"]')
.should('have.text', "Already in the lists");
cy.get('ul li label input[type="checkbox"][aria-checked="true"]').each(($checkbox) => {
cy.wrap($checkbox).should('be.checked');
});
cy.contains('button', "Save").should('be.disabled');
cy.log('The product has already in List and Save button is disabled');
cy.contains('button', "Cancel").click();

}

checkAddNewList() {

cy.contains('button', " Add new list").should('be.disabled');
cy.log('Add new list is disabled');

}

clickOnAllCheckbox(){

cy.get('ul li label input[type="checkbox"]').each(($checkbox) => {
// Check if the checkbox is not already checked
if (!$checkbox.prop('checked')) {
// Click the checkbox
cy.wrap($checkbox).click();

// Assert that the checkbox is checked after clicking
cy.wrap($checkbox).should('be.checked');
}
});
}

clickOnStars() {
let count;

cy.get('b[class="font-extrabold"]')
.invoke('text')
.then((text) => {
count = parseInt(text); // Convert text to integer
cy.log(count);
cy.get(CatalogPageLocators.STAR).its('length').then((length) => {
if (length >= count) {
cy.get(CatalogPageLocators.STAR).each(($star, index) => {
if (index <= count) {
cy.wrap($star).click();
this.addProductToNewList();
}
});
}
});

cy.get('svg[class="vc-icon w-5 h-5 lg:w-4 lg:h-4 text-[--color-primary-500]"]')
.its('length')
.should('be.lte', 10);
});
}


openProductPage(){

cy.get('.vc-popover > .vc-popover__trigger > .my-px')
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
cy.log('Product not added to any list')
});
}

prepareProductsForList(){

this.addProductsToExistList();
this.clickOnSingleStar();
this.checkAlreadyInList();

}

clickShowInStock(){

cy.get(CatalogPageLocators.SHOW_IN_STOCK).click();

}


}

export default CatalogPage;
