import ProductCard from "./ProductCard";
import { CatalogPageLocators } from "./CatalogLocators";
const productCard = new ProductCard();


class CatalogPage {
  visit(path) {
    cy.visit(`${Cypress.env('PLATFORM_URL')}/${path}`);
    cy.wait(1000);
    cy.get('.vc-typography').should('be.visible');
     

  }

  checkCatalogPage() {
  
  cy.get('.vc-typography').should('be.visible').and('have.text', 'Catalog');    
  cy.log('Step: Visited Catalog Page');
  cy.get('.vc-widget__slot').should('be.visible').and('contain', 'Catalog')
  cy.log('Catalog page is visible');  

  }

addToCart(amount) {
  cy.log('Adding products to cart');
  cy.get(CatalogPageLocators.BUY_BUTTONS)
    .should('be.visible')
    .not('[disabled]')
    .filter(':visible')
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

/**
 * @deprecated Since version X.X.X
 * Please use addToCart() instead.
 */
addToCartOne(amount) {
    cy.log('DEPRECATED: Please use addToCart() instead');
    return this.addToCart(amount);
}

/**
 * @deprecated Since version X.X.X
 * Please use addToCartOne(1) instead.
 * This method will be removed in future versions.
 * @example
 * // Instead of:
 * catalogPage.AddToCartSingleBtn();
 * // Use:
 * catalogPage.addToCartOne(1);
 */
AddToCartSingleBtn() {
    cy.log('DEPRECATED: Please use addToCartOne(1) instead');
    return this.addToCart(1);
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

productCard.isInactive();

this.clickOnSingleHEART();

this.addProductToNewList();

productCard.isActive();

this.inActiveStateView()
cy.switchProductView('Grid')
this.activeStateView()

cy.log('Check heart from Grid View')
productCard.isActive();

}

addToExistList(){

cy.contains('h2', "Please select list").should('exist');
this.clickOnAllCheckbox();
cy.wait(500);
cy.contains('.vc-dialog-footer > .vc-button--color--primary', "Save")
.should('be.enabled')
.click();
cy.wait(1000);
cy.contains('h2', "Please select list").should('not.exist');
// Check the notification banner
cy.checkNotificationBanner('Your lists were successfully updated');

}

addProductsToExistList(amount){

  cy.get(CatalogPageLocators.ADD_TO_LIST)
  .should('be.visible') // Ensure at least one heart is visible
  .then(($hearts) => {
    const heartsToClick = $hearts.slice(0, Math.min(amount, $hearts.length)); // Select only `amount` hearts

    cy.wrap(heartsToClick).each(($heart) => {
      cy.wrap($heart).click();
      this.addToExistList();
    });
  });

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

clickOnHEARTs(amount) {

  cy.get(CatalogPageLocators.ADD_TO_LIST)
  .should('be.visible') // Ensure at least one heart is visible
  .then(($hearts) => {
    const heartsToClick = $hearts.slice(0, Math.min(amount, $hearts.length)); // Select only `amount` hearts

    cy.wrap(heartsToClick).each(($heart) => {
      cy.wrap($heart).click();
      this.addProductToNewList();
    });
  });

cy.get(CatalogPageLocators.ACTIVE_HEART)
.its('length')
.should('be.lte', 10);
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

prepareProductsForList(amount){

this.addProductsToExistList(amount);
this.clickInTheList();
this.checkAlreadyInList();

}

clickShowInStock(){

cy.get(CatalogPageLocators.SHOW_IN_STOCK).click();

}

scrollUntilFindAddToCart(maxScrolls = 10, amount) {
  cy.log('Scrolling to find an enabled Add to Cart button');

  let attempts = 0;

  function scrollAndCheck() {
    if (attempts >= maxScrolls) {
      cy.log('Reached maximum scroll attempts, stopping.');
      throw new Error('Maximum scroll attempts reached without finding an enabled Add to Cart button.');
    }

    attempts++;

    // Scroll to the bottom of the page
    cy.window().scrollTo('bottom', { ensureScrollable: false });

    cy.checkLoading('.vc-button__loader');

    // Check if an enabled Add to Cart button exists
    cy.get(CatalogPageLocators.BUY_BUTTONS)
      .should('be.visible')
      .not('[disabled]')
      .filter(':visible')
      .then($buttons => {
        if ($buttons.length > 0) {
          cy.wrap($buttons).each(($button, index) => {
            if (index < amount) {
              cy.wrap($button).click();
              cy.checkLoading('.vc-button__loader');
              cy.get(CatalogPageLocators.UPDATE_BUTTON)
                .should('be.visible')
                .and('contain.text', 'Update cart');
            }
          });
        } else {
          cy.log('No enabled button found, scrolling again...');
          scrollAndCheck();
        }
      });
  }

  scrollAndCheck();
}


}


export default CatalogPage;
