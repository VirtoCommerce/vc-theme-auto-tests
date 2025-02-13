import ProductCard from "./ProductCard";
import { CatalogPageLocators } from "./CatalogLocators";


class CatalogPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.wait(1000);
    cy.get('.vc-layout__content').should('be.visible');
    cy.get('.vc-typography').should('be.visible');
    cy.log('Step: Visited Catalog Page');

  }

  checkCatalogPage() {
  cy.get('.vc-typography').should('be.visible').and('have.text', 'Catalog');
  cy.get('.vc-widget__slot').should('be.visible').and('contain', 'catalog')
  cy.log('Catalog page is visible');

  }

  purchaseAll(amount = 100) {
    cy.log('Add products to cart')
    cy.get(CatalogPageLocators.BUY_BUTTONS)
     .if('not.be.disabled')
     .then(() => {
    cy.get(CatalogPageLocators.BUY_BUTTONS)
     .invoke("slice", 1, amount)
      .each(($addToCart) => {
        cy.wrap($addToCart).click();
        cy.checkLoading('.vc-button__loader');
    })
  })
   .else('disabled')
    .then(() => {      
      cy.log('The button is disabled');
  }
  )
}

addToCartOne(amount) {
  cy.log('Adding products to cart');

  cy.get(CatalogPageLocators.BUY_BUTTONS)
  .should('be.visible') // Ensure at least one visible button exists
  .not('[disabled]') // Filter out disabled buttons
  .filter(':visible') // Ensure only visible buttons are selected
  .each(($button, index) => {
    if (index < amount) {
      cy.wrap($button).click();
      cy.checkLoading('.vc-button__loader');
      cy.get(CatalogPageLocators.UPDATE_BUTTON)
        .should('be.visible')
        .and('contain.text', 'Update cart');
    }
  });
  cy.log('Products have been added to the cart and the buttons changed state');
}


addToCart(amount) {

cy.log('Add products to cart')

cy.get(CatalogPageLocators.BUY_BUTTONS)
  .if('visible')
  .then(() => {
  cy.get(CatalogPageLocators.BUY_BUTTONS)
  .invoke("slice", 0, amount)
  .each(($BUY_BUTTONS) => {
  cy.wrap($BUY_BUTTONS).click();
  cy.checkLoading('.vc-button__loader');
  cy.get(CatalogPageLocators.UPDATE_BUTTON)
  .should('be.visible')
  .and('contain.text', 'Update cart');  
  })
  })
  .else('disabled')
  .then(() => {
  cy.log('The button is disabled');
  });


}


AddToCartSingleBtn(){

cy.get('.vc-typography').should('exist');
cy.get(CatalogPageLocators.BUY_BUTTONS).should('be.visible');
cy.get(CatalogPageLocators.BUY_BUTTONS).eq(1).should('not.be.disabled').click();
cy.get(CatalogPageLocators.UPDATE_BUTTON)
.should('be.visible')
.and('contain.text', 'Update cart');
cy.log('product have been added to the cart and the buttons changed state');

}


inActiveStateView(){

cy.log('Check color if inActive')
cy.get('button[class="flex rounded p-2 text-primary hover:text-primary-600"]')
.should('have.class', 'text-primary')
.and('be.visible')

}

activeStateView(){

cy.log('Check color if Active')
cy.get('button[class="flex rounded p-2 cursor-auto bg-additional-50 text-neutral-700 hover:shadow-md"]')
.should('have.class', 'text-neutral-700')
.and('be.visible')

}

clickOnSingleHEART(){


cy.get(CatalogPageLocators.ADD_TO_LIST)
.should('be.visible')
.eq(0)
.click()

}

clickInTheList(){

 cy.get(CatalogPageLocators.INN_THE_LIST)
.should('be.visible')
.eq(0)
.click()
  
}

clickOnHeartTFromPDP(){

cy.get(CatalogPageLocators.ADD_TO_LIST).last().click();

}

addToListAnonim(){

cy.log('User is Anonim');
cy.contains('a', "Sign up now").should('be.visible');

this.inActiveStateView();
cy.switchProductView('List');
this.activeStateView();

cy.get('button[aria-label="Wishlists are available only for authenticated users"]')
.eq(0)
.should('be.disabled');

this.inActiveStateView()
cy.switchProductView('Grid')
this.activeStateView()

cy.get('button[aria-label="Wishlists are available only for authenticated users"]')
.eq(0)
.should('be.disabled');


}

addToListAnonimProductPage(){

cy.get('.vc-product-actions-button--color--danger')
.eq(0)
.should('be.visible');
cy.get('button[aria-label="Wishlists are available only for authenticated users"]')
  .eq(0)
  .should('be.disabled');

}

//need to refactor this method and locators
addProductToNewList(){

cy.contains('h2', "Please select list").should('exist');
cy.get('.justify-between > .flex').should('be.visible');
cy.get('.justify-between > .flex')
.if('enabled')
.then(() => {
cy.contains('button', " Add new list").should('be.visible').click();
cy.get('input[type="checkbox"]').should('be.checked');
cy.clickOnActiveDialogButton();
cy.contains('h2', "Please select list").should('not.exist');
cy.checkNotificationBanner('Your lists were successfully updated');
})
.else('disabled')
.then(() => {
cy.contains('.vc-dialog-footer > .vc-button--color--primary', "Save")
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

ProductCard.isInactive();

this.clickOnSingleHEART();

this.addProductToNewList();

ProductCard.isActive();

this.inActiveStateView()
cy.switchProductView('Grid')
this.activeStateView()

cy.log('Check heart from Grid View')
ProductCard.isActive();

}

addToExistList(){

cy.contains('h2', "Please select list").should('exist');
this.clickOnAllCheckbox();
cy.wait(500);
cy.contains('.vc-dialog-footer > .vc-button--color--primary', "Save")
.should('be.enabled')
.click();
cy.wait(500);
cy.contains('h2', "Please select list").should('not.exist');
// Check the notification banner
cy.checkNotificationBanner('Your lists were successfully updated');

}

addProductsToExistList(){

cy.get(CatalogPageLocators.ADD_TO_LIST).first().should('be.visible');
cy.get(CatalogPageLocators.ADD_TO_LIST).each(($heart) => {
cy.wrap($heart).click();
this.addToExistList();

})

}

checkAlreadyInList(){

cy.contains('h2', "Please select list").should('be.visible');
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

clickOnHEARTs() {
let count;

cy.get('b[class="font-black"]')
.invoke('text')
.then((text) => {
count = parseInt(text); // Convert text to integer
cy.log(count);
cy.get(CatalogPageLocators.ADD_TO_LIST).its('length').then((length) => {
if (length >= count) {
cy.get(CatalogPageLocators.ADD_TO_LIST).each(($heart, index) => {
if (index <= count) {
cy.wrap($heart).click();
this.addProductToNewList();
}
});
}
});

cy.get(CatalogPageLocators.ACTIVE_HEART)
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
cy.contains('h2', "Please select list").should('not.exist');
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
this.clickInTheList();
this.checkAlreadyInList();

}

clickShowInStock(){

cy.get(CatalogPageLocators.SHOW_IN_STOCK).click();

}
}


export default CatalogPage;
