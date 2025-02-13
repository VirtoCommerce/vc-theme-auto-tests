import cartPageLocators from "../../pageObjects/cartPage/cartPageLocators";

class ItemCheckboxToggleDespiteState {

    validateCheckboxToggleDespiteState() {
        cy.get(cartPageLocators.lineItemCheckbox)
            .each(($checkbox) => {
                cy.wrap($checkbox)
                    // Ensure the checkbox is not disabled
                    .should('not.be.disabled') 

                // Check the initial state of the checkbox
                cy.wrap($checkbox).then(($checkbox) => {
                    if ($checkbox.prop('checked')) {
                        cy.log('INITIALLY CHECKED')
                        this.validateSelectedCheckBoxToggle($checkbox);
                    } else {
                        cy.log('INITIALLY UNCHECKED')
                        this.validateUnselectedCheckBoxToggle($checkbox);
                    }
                });
            });
    }
    
    validateSelectedCheckBoxToggle($checkbox) {
        cy.wrap($checkbox)
            .should('not.be.disabled')
            .click({ force: true })
            .get(cartPageLocators.loader)
            .should('exist')
            .get(cartPageLocators.loader)
            .should('not.exist');
        cy.wrap($checkbox)
            .should('not.be.checked')
            .click({ force: true })
            .get(cartPageLocators.loader)
            .should('exist')
            .get(cartPageLocators.loader)
            .should('not.exist');
        cy.wrap($checkbox).should('be.checked');
    }
    
    validateUnselectedCheckBoxToggle($checkbox) {
        cy.wrap($checkbox)
            .should('not.be.checked')
            .click({ force: true })
            .get(cartPageLocators.loader)
            .should('exist')
            .get(cartPageLocators.loader)
            .should('not.exist');
        cy.wrap($checkbox).should('be.checked');
        cy.wrap($checkbox)
            .click({ force: true })
            .get(cartPageLocators.loader)
            .should('exist')
            .get(cartPageLocators.loader)
            .should('not.exist');
        cy.wrap($checkbox).should('not.be.checked');
    }

    validateTogglesAllInOneMethod() {
        cy.get(cartPageLocators.lineItemCheckbox)
            .each(($checkbox) => {
                cy.wrap($checkbox)
                    .should('not.be.disabled');
                
                cy.wrap($checkbox).then(($checkbox) => {
                    if ($checkbox.prop('checked')) {
                        cy.log('INITIALLY CHECKED');
                        cy.wrap($checkbox)
                            .should('not.be.disabled')
                            .click({ force: true })
                            .get(cartPageLocators.loader)
                            .should('exist')
                            .get(cartPageLocators.loader)
                            .should('not.exist');
                        cy.wrap($checkbox)
                            .should('not.be.checked')
                            .click({ force: true })
                            .get(cartPageLocators.loader)
                            .should('exist')
                            .get(cartPageLocators.loader)
                            .should('not.exist');
                        cy.wrap($checkbox).should('be.checked');
                    } else { 
                        cy.log('INITIALLY UNCHECKED'); // Changed log for clarity
                        cy.wrap($checkbox)
                            .should('not.be.checked')
                            .click({ force: true })
                            .get(cartPageLocators.loader)
                            .should('exist')
                            .get(cartPageLocators.loader)
                            .should('not.exist');
                        cy.wrap($checkbox).should('be.checked');
                        cy.wrap($checkbox)
                            .click({ force: true })
                            .get(cartPageLocators.loader)
                            .should('exist')
                            .get(cartPageLocators.loader)
                            .should('not.exist');
                        cy.wrap($checkbox).should('not.be.checked');
                    }
                }); // Closing the `then` callback
            }); // Closing the `each` loop
    }

}

export default ItemCheckboxToggleDespiteState;