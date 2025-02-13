import clearCartPopUpLocators from "../clearCartPopUp/clearCartPopUpLocators";
import cartPageLocators from "./cartPageLocators";
import SimpleUtils from "../../utils/simpleUtils";
import checkboxUtils from "../../utils/checkboxUtils";

class removeAllLineItemsOneByOne {

    removeAllLineItemsOneByOne() {
        cy.get(cartPageLocators.lineItemsContainer)
          .each(($itemsContainer) => {
            cy.wrap($itemsContainer)
              .find(cartPageLocators.lineItem)
              .each(($lineItem) => {
                cy.wrap($lineItem)
                  .find(cartPageLocators.LineItemSku)
                  .invoke('text')
                  .then((skuValue) => {
                    // Click the remove button for the current line item
                    cy.wrap($lineItem)
                      .find(cartPageLocators.removeLineItemButton)
                      .click();
      
                    // Wait for the loader to appear and disappear
                    cy.get(cartPageLocators.loader).should('exist');
                    cy.get(cartPageLocators.loader).should('not.exist');
      
                    // Verify that the line item is removed from the DOM
                    cy.wrap($itemsContainer)
                      .find(cartPageLocators.lineItem)
                      .should('not.contain.text', skuValue);
                  });
              });
          });
      }
    
}

export default removeAllLineItemsOneByOne;