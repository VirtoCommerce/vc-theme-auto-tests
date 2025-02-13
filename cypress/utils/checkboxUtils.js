import SimpleUtils from "./simpleUtils"

const toggleCheckboxState = ($context, enable) => {

    //used this way as loader selector is the same on any page
    cy.wrap($context)
        .should('not.be.disabled')
        .should(enable ? 'be.checked' : 'not.be.checked')
        .click({ force: true })
        SimpleUtils.waitForLoader()
    cy.wrap($context)
        .should(enable ? 'not.be.checked' : 'be.checked');
        
}
// Export the method
export default { toggleCheckboxState };
