import lineItemLocators from './lineItemLocators';
import supplierItemsContainerLocators from '../supplierLineItemsContainer/supplierLineItemsContainerLocators';
import SimpleUtils from '../../../utils/simpleUtils';
import checkboxUtils from '../../../utils/checkboxUtils';
import CartPage from '../cartPage';
//import commonElementsLocators from '../../commonElements/commonElementsLocators';
import cartPageLocators from '../cartPageLocators';

const cartPage = new CartPage();

class LineItem {
  changeLineItemQuantity() {
    const quantity = 30;
    cy.get(lineItemLocators.lineItemQuantityInput)
      .each(($quantityInput) => {
        cy.wrap($quantityInput)
          .should('not.be.disabled')
          .invoke('val', quantity)
          .trigger('input')
          .should('have.value', quantity);
        SimpleUtils.waitForLoader();
      });
  }

  validateLineLineItemCheckboxToggle() {
    // Toggles checkbox on every lineItem
    cy.get(supplierItemsContainerLocators.lineItemsContainer)
      .each(($itemsContainer) => {
        cy.wrap($itemsContainer)
          .find(lineItemLocators.lineItemCheckbox)
          .each(($checkbox) => {
            checkboxUtils.toggleCheckboxState($checkbox, true);
            checkboxUtils.toggleCheckboxState($checkbox, false);
          });
      });
  }

  removeOneRandomLineItem() {
    // Removes one random item for every supplier in the cart
    cy.get(supplierItemsContainerLocators.lineItemsContainer)
      .each(($itemsContainer) => {
        cy.wrap($itemsContainer)
          .find(lineItemLocators.lineItem)
          .then(($lineItems) => {
            // Use one random item from the list
            const randomLineItem = SimpleUtils.getRandomItemFromList($lineItems);
            // Proceed with the random line item
            cy.wrap(randomLineItem)
              .find(lineItemLocators.lineItemSku)
              .invoke('text')
              .then((skuValue) => {
                cy.wrap(randomLineItem)
                  .find(lineItemLocators.removeLineItemButton)
                  .click();
                SimpleUtils.waitForLoader();

                // Verify that the line item is removed from the DOM
                cy.wrap($itemsContainer)
                  .find(lineItemLocators.lineItem)
                  .should('not.contain.text', skuValue);
              });
          });
      });
  }

  removeAllLineItemsOneByOne() {
    cy.get(supplierItemsContainerLocators.lineItemsContainer)
      .each(($itemsContainer) => {
        cy.wrap($itemsContainer)
          .find(lineItemLocators.lineItem)
          .each(($lineItem) => {
            cy.wrap($lineItem)
              .find(lineItemLocators.lineItemSku)
              .invoke('text')
              .then((skuValue) => {
                // Click the remove button for the current line item
                cy.wrap($lineItem)
                  .find(lineItemLocators.removeLineItemButton)
                  .click();
                cy.wait(3000); // Used instead of waiting for loader as it doesn't appear when the last item is removed
                cy.get(cartPageLocators.cartPageBody) // Verify SKU is not on the page anymore
                  .should('not.contain.text', skuValue);
              });
          });
      });
    cartPage.verifyContinueShoppingbutton(); // Continue shopping button is expected to appear if the cart is empty
  }
}

export default LineItem;