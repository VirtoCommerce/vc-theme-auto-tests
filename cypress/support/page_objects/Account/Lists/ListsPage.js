import { ListsLocators } from "../ListsLocators";
import { CartPageLocators } from "../../CartPage/CartPageLocators/CartPageLocators";
import Lists_data from "./Lists_data";
import { CatalogPageLocators } from "../../CatalogPage/CatalogLocators";

class Lists {
  goToListTab() {
    cy.log('Go to Lists tab');
    cy.get(ListsLocators.LISTS_TAB)
      .should('exist')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click({force: true});
    
    // Verify navigation
    cy.location('pathname').should('eq', "/account/lists");
    
    // Wait for page load and verify content
    cy.get('.vc-typography--variant--h1')
      .should('be.visible')
      .and('contain', 'Lists');
  }

  isListsPageEmpty() {
    cy.log("Verify lists page is empty");
    this.goToListTab();
    cy.wait(2000);
    cy.get(ListsLocators.LISTS_TITLE)
      .if('visible')
      .then(() => {
        this.deleteMultipleLists();
      })
      .else()
      .then(() => {
        this.emptyListsPageView();
      });
  }

  emptyListsPageView() {
    cy.log('Check empty Lists view');
    cy.get('.vc-typography--variant--h1').contains('Lists');
    cy.get(ListsLocators.EMPTY_LIST_VIEW).should('be.visible');
    cy.get(ListsLocators.EMPTY_ICON).should('be.visible');
    cy.contains('div', "You have not created any lists yet");
    cy.contains('span', 'Create list');
    cy.log('The lists page is empty');
  }

  emptyListDetailPage() {
    cy.get('.vc-empty-view__text').should('have.text', 'Your list is empty');
    cy.contains('a', 'Continue browsing');
    cy.contains('button', 'Add all to cart').should('be.disabled');
    cy.contains('button', 'Save changes').should('be.disabled');
    cy.contains('button', 'List settings').should('be.enabled');
  }

  goToListDetailsPage() {
    cy.log('Open list details page');
    cy.get(ListsLocators.LISTS_TITLE).last().click();
  }

  createPersonalList(listName, listDescription) {
    cy.log('Creating a new list');
    cy.contains('button', 'Create list').should('be.visible').click();

    cy.get(CartPageLocators.DIALOG_TITLE)
      .should('be.visible')
      .and('have.text', 'New List');

    cy.get('input[aria-label="List name"]')
      .should('be.visible')
      .clear()
      .type(listName, { delay: 100 });

    cy.get('textarea')
      .should('be.visible')
      .clear()
      .type(listDescription, { delay: 100 });

    cy.get(CartPageLocators.DIALOG_FOOTER)
      .contains('Create list')
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.get(CartPageLocators.DIALOG_TITLE, { timeout: 6000 }).should('not.exist');
    cy.log('Checking created list');
    cy.contains('a', listName).should('be.visible');
    this.checkProductCounter();
  }

  createLists() {
    const randomNumber = Lists_data.getRandomNumber();
    const randomWord = Lists_data.getRandomWord();

    cy.contains('button', 'Create list')
      .if('enabled')
      .then(() => {
        cy.contains('button', 'Create list').should('be.visible').click();
        cy.get(CartPageLocators.DIALOG_TITLE).should('have.text', 'New List');
        cy.get(ListsLocators.LIST_NAME).type(`${randomWord}${randomNumber}`, { delay: 100 });
        cy.get('textarea').type(`${Lists_data.lists[0].description1} ${randomWord}${randomNumber}`, { delay: 100 });
        cy.get(CartPageLocators.DIALOG_FOOTER).should('have.text', 'Create list').click();
        cy.wait(1000);
        cy.contains(CartPageLocators.DIALOG_TITLE, 'New List').should('not.exist');
      })
      .else('disabled')
      .then(() => {
        cy.get('.justify-between > .vc-button').should('be.disabled');
        cy.log('Create list button is disabled');
      });
  }

  createMultipleLists() {
    for (let i = 0; i <= 10; i++) {
      this.createLists();
    }
  }

  checkListsAfterCreated() {
    cy.log('Check created lists');
    cy.get('.vc-empty-view__text').should('not.exist');
    cy.get(ListsLocators.LISTS_TITLE).its('length').should('gte', 1);
    this.checkProductCounter();
    cy.get(ListsLocators.LISTS_TITLE).first().click();
  }

  compareProductsCount() {
    cy.get(ListsLocators.COUNTER)
      .first()
      .invoke('text')
      .then((count1) => {
        const productCount = parseInt(count1.trim());
        cy.log(`Product counter is: ${productCount}`);

        this.goToListDetailsPage();
        this.countItemsFromAllPages(productCount);
      });
  }

  countItemsFromAllPages(productCount) {
    let totalLineItems = 0;

    const countItems = () => {
      cy.get(ListsLocators.LINE_ITEM)
        .then($items => {
          const currentPageCount = $items.length;
          totalLineItems += currentPageCount;
          cy.log(`Found ${currentPageCount} items on current page. Running total: ${totalLineItems}`);

          cy.get('body').then($body => {
            const hasNextPage = $body.find(ListsLocators.NEXT_PAGE_BUTTON).length > 0 
              && !$body.find(ListsLocators.NEXT_PAGE_BUTTON).prop('disabled');

            if (hasNextPage) {
              cy.get(ListsLocators.NEXT_PAGE_BUTTON)
                .should('be.visible')
                .click()
                .then(() => {
                  // Wait for items to load on next page
                  cy.get(ListsLocators.LINE_ITEM).should('exist');
                  countItems();
                });
            } else {
              cy.log(`Final count: Found ${totalLineItems} total items across all pages`);
              cy.log(`Expected count from counter: ${productCount}`);
              
              expect(totalLineItems).to.equal(productCount, 
                `Product counter (${productCount}) should match total items found (${totalLineItems})`);
            }
          });
        });
    };

    // Start counting from first page
    countItems();
  }

  checkProductCounter() {
    cy.get(ListsLocators.COUNTER)
      .first()
      .invoke('text')
      .then((count) => {
        const productCount = parseInt(count.trim());
        cy.log(`Product counter is: ${productCount}`);
      });
  }

  editListFromSettings(listName, listDescription) {
    cy.log('Edit list name');
    cy.get(ListsLocators.SETTINGS_WHEEL).first().click();
    cy.get(ListsLocators.DROP_DOWN).should('be.visible');
    cy.get(ListsLocators.DROP_DOWN_ITEM).contains('Edit').click();
    cy.get(CartPageLocators.DIALOG_TITLE).should('be.visible').and('have.text', ListsLocators.LIST_SETTINGS);
    cy.contains('button', 'Save').should('be.disabled');
    cy.get(ListsLocators.LIST_NAME).clear().type(listName, { delay: 100 });
    cy.get('textarea').clear().type(listDescription, { delay: 100 });
    cy.contains('button', 'Save').should('be.enabled').click();
    cy.contains(CartPageLocators.DIALOG_TITLE, ListsLocators.LIST_SETTINGS).should('not.exist');
    cy.log('The name of list is updated');
  }

  editListFromDetailsPage(listName, listDescription) {
    cy.log('Edit list from details page');
    cy.contains('button', 'List settings').should('be.enabled').click();
    cy.get(CartPageLocators.DIALOG_TITLE).should('be.visible').and('have.text', ListsLocators.LIST_SETTINGS);
    cy.contains('button', 'Save').should('be.disabled');
    cy.get(ListsLocators.LIST_NAME).clear().type(listName, { delay: 100 });
    cy.get('textarea').clear().type(listDescription, { delay: 100 });
    cy.clickOnActiveDialogButton();
    cy.contains(CartPageLocators.DIALOG_TITLE, ListsLocators.LIST_SETTINGS).should('not.exist');
    cy.log('The name of list is updated');
  }

  compareListsNames() {
    const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();

    cy.get('[aria-current]')
      .first()
      .invoke('text')
      .then((text1) => {
        cy.get('.vc-typography')
          .invoke('text')
          .then((text2) => {
            expect(normalizeText(text1)).to.equal(normalizeText(text2));
          });
      });
  }

  editList() {
    this.compareListsNames();
    this.clickToListsRouter();

    this.editListFromSettings(Lists_data.lists[1].name2, Lists_data.lists[1].description2);
    this.goToListDetailsPage(Lists_data.lists[1].name2);
    this.compareListsNames();

    this.editListFromDetailsPage(Lists_data.lists[2].name3, Lists_data.lists[2].description3);
    this.compareListsNames();
    this.clickToListsRouter();
  }

  clickToListsRouter() {
    cy.get(ListsLocators.ROUTER_LINK).last().click();
    cy.location('pathname').should('eq', "/account/lists");
  }

  switchBetweenLists() {
    cy.get('div[class="ml-4 flex items-center space-x-2 overflow-hidden text-ellipsis px-3 text-sm"]')
      .last()
      .click();
    this.compareListsNames();
  }

  checkListDetailsPage() {
    cy.log('check List Details Page');
    cy.get('.vc-empty-view__text').should('not.exist');
    cy.contains('button', 'Add all to cart').should('be.enabled');
    cy.contains('button', 'Save changes').should('be.disabled');
    cy.contains('button', 'List settings').should('be.enabled');
    cy.get('.vc-line-item').should('exist');
  }

  deleteList() {
    cy.log('Delete list');
    cy.get('.vc-empty-view__text')
      .if('not.exist')
      .then(() => {
        cy.get(ListsLocators.SETTINGS_WHEEL).first().click();
        cy.get(ListsLocators.DROP_DOWN).should('be.visible');
        cy.get(ListsLocators.DROP_DOWN_ITEM).contains('Delete').click();
        cy.confirmDelete();
      })
      .else()
      .then(() => {
        this.emptyListsPageView();
        cy.log('All lists were deleted');
      });
  }

  deleteMultipleLists() {
    cy.get(ListsLocators.LISTS_TITLE)
      .should('have.length.gte', 1)
      .then((elements) => {
        elements.each(() => {
          this.deleteList();
        });
      });
  }

  removeSingleProduct() {
    cy.wait(1000);
    cy.get(ListsLocators.REMOVE_BUTTON)
      .if('exist')
      .then(() => {
        cy.get(ListsLocators.REMOVE_BUTTON)
          .first()
          .click();
        cy.confirmDelete();
      })
      .else('not.exist')
      .then(() => {
        cy.get(ListsLocators.REMOVE_BUTTON).should('have.length', 0);
        cy.log('All items were removed from list');
      });
  }

  testRemove() {
    cy.get(ListsLocators.LINE_ITEM)
      .then(($items) => {
        const itemCount = $items.length;
        cy.log(`Found ${itemCount} items on page`);
        
        for(let i = 0; i < Math.min(itemCount, 6); i++) {
          this.removeSingleProduct();
          cy.wait(1000); // Small wait to allow UI to update
        }
      });
  }

  removeProductsFromAllPages() {
    cy.get(ListsLocators.LINE_ITEM)
      .then(($items) => {
        const totalItems = $items.length;
        cy.log(`Found ${totalItems} total line items on current page`);

        cy.get('.vc-pagination__page')
          .if('exist')
          .then(($pages) => {
            const totalPages = $pages.length;
            
            if (totalPages > 0) {
              cy.log(`Found ${totalPages} pages with 6 items per page`);
              
              for (let page = 0; page < totalPages; page++) {
                this.testRemove();
                
                if (page < totalPages - 1) {
                  cy.get('.vc-pagination__next').click();
                  cy.wait(1000);
                }
              }
            }
          })
          .else('not.exist')
          .then(() => {
            cy.log('Single page with items - removing all items');
            this.testRemove();
          });
      });
  }

  clickOnAddAllToCart() {
    cy.contains('button', 'Add all to cart').click();
  }


  clickOnViewCart() {
    cy.checkAddingProductsToCart();
    cy.contains('button', "Successfully added").should('be.visible');
    cy.contains('a', "View cart").click();
    cy.location('pathname').should('eq', "/cart");
  }

  createListData() {
    this.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
    this.goToListDetailsPage();
    this.emptyListDetailPage();
    cy.clickOnContinue("Continue browsing");
    cy.location('pathname').should('eq', "/catalog");
    cy.get('.vc-typography > span').should('be.visible').and('have.text', 'Catalog');
    cy.get('.-mt-1').should('be.visible').and('contain', 'Catalog');
  }

  checkNewList() {
    this.goToListTab();
    this.checkListsAfterCreated();
    this.checkListDetailsPage();
  }

  changeQuantity(value) {
    cy.log('Finding first visible product with quantity input field');
    cy.get(ListsLocators.INPUT)
      .should('exist')
      .and('be.visible')
      .first()
      .scrollIntoView()
      .clear()
      .type(value, { delay: 100 })
      .should('have.value', value);
  }

  saveChanges(action) {
    this.changeQuantity(Math.floor(Math.random() * 20) + 1);
    cy.wait(1000);
    cy.contains('button', 'Save changes').should('be.enabled').click();
    this.saveChangesPopUp();
    cy.clickOnButton(action);
    cy.get(CartPageLocators.DIALOG_TITLE).should('not.exist');
    cy.wait(1000);
    cy.contains('button', 'Save changes').should('be.disabled');
  }

  saveChangesPopUp() {
    cy.get(CartPageLocators.DIALOG_TITLE).should('be.visible').and('have.text', 'Save changes');
    cy.get('.vc-dialog-content').contains('Would you like to save changes?');
    cy.contains('button', 'Yes').should('be.enabled');
    cy.contains('button', 'No').should('be.enabled');
  }

  updateQuantityInList() {
    cy.log('Check qty update > Save changes');
    this.saveChanges('No');
    this.saveChanges('Yes');
  }

  leaveList() {
    cy.log('Change qty > leave the list > Save changes > Yes');
    this.changeQuantity(Math.floor(Math.random() * 20) + 1);
    cy.get(ListsLocators.ROUTER_LINK).click();
    cy.wait(1000);
    this.saveChangesPopUp();
    cy.clickOnButton('Yes');
    cy.wait(1000);
    cy.location('pathname').should('eq', "/account/lists");
    this.goToListDetailsPage();

    cy.log('Change qty > leave the list > Save changes > No');
    this.changeQuantity(Math.floor(Math.random() * 20) + 1);
    cy.wait(1000);
    cy.get(ListsLocators.ROUTER_LINK).click();
    cy.wait(1000);
    this.saveChangesPopUp();
    cy.clickOnButton('No');
    cy.location('pathname').should('eq', "/account/lists");
  }

  listCounter() {
    cy.get(ListsLocators.LIST_OF_LISTS)
      .its('length')
      .then((length) => {
        cy.log('The length of lists is:', length);
      });
  }

  listSwitcher() {
    for (let i = 7; i <= 15; i++) {
      cy.get(`:nth-child(${i}) > .line-clamp-2`).click();
      cy.wait(1000);
      this.compareListsNames();
      cy.wait(1000);
    }
  }
}

export default Lists;