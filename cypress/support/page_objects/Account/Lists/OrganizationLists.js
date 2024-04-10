import { ListsLocators } from "../ListsLocators";
import Lists_data from "./Lists_data";

class OrganizationLists {

createPrivateList(list_name, list_description){

cy.log('Create a new list');
cy.contains('button', 'Create list').click();

// Verify that the new list form is displayed with the expected heading and checkbox state
cy.get('h3').should('be.visible').and('have.text', 'New List');
cy.get('input[aria-checked="true"]').should('exist'); // Verify checkbox state
cy.get('input[type="checkbox"]').should('be.checked'); // Ensure checkbox is checked

// Fill in the list name and description
cy.get('input[type="text"]').eq(1).type(list_name);
cy.get('textarea').type(list_description);

cy.contains('.flex-wrap > .vc-button--color--primary', 'Create list').click();
cy.contains('h3', 'New List').should('not.exist');
cy.log('Check created list');

// Verify that the newly created list name is visible
cy.contains('a', list_name).should('be.visible');
cy.checkLabel('Private');
      
}

checkMenuDropDown(scope){
   
cy.log('Check menue drop-down');
cy.get(ListsLocators.SETTINGS_WHEEL).eq(0).click();
cy.get(ListsLocators.DROP_DOWN).should('be.visible');
cy.get(ListsLocators.DROP_DOWN_ITEM).contains('Edit').should('be.visible');
cy.get(ListsLocators.DROP_DOWN_ITEM).contains(scope).should('be.visible');
cy.get(ListsLocators.DROP_DOWN_ITEM).contains('Delete').should('be.visible');
cy.get(ListsLocators.SETTINGS_WHEEL).eq(0).click();

}

clickOnDropDownBtn(actionName){

cy.get(ListsLocators.SETTINGS_WHEEL).eq(0).click();
cy.get(ListsLocators.DROP_DOWN).should('be.visible');
cy.get(ListsLocators.DROP_DOWN_ITEM).contains(actionName).click();
 
}

clickOnListSettingsBtn(){

cy.contains('button', 'List settings').should('be.enabled').click();

}
    

editOrgList(list_description){

// Generate a random number between 0 and 100
const randomNumber = Lists_data.getRandomNumber();
// Generate a random word
const randomWord = Lists_data.getRandomWord();

cy.log('Edit list');
cy.get('h3').should('be.visible').and('have.text', "List Settings");
cy.get('input[aria-checked]').should('exist'); // Verify checkbox state
cy.contains('span', 'Private list');
cy.contains('button', 'Save').should('be.disabled');
cy.get('input[type="text"]').eq(1).clear();
cy.get('input[type="text"]').eq(1).type(randomWord + randomNumber);
cy.get('textarea').clear();
cy.get('textarea').type(list_description + ' ' + randomWord + randomNumber);
this.clickOnCheckbox();
cy.get('.inline-block > .flex-wrap > .vc-button--color--primary').should('be.enabled').click();
cy.contains('h3', "List Settings").should('not.exist');
cy.log('The name of list is updated');

}
    
    

clickOnCheckbox(){

cy.get('input[type="checkbox"]')
.if('checked')
.then(() => {
cy.get('input[type="checkbox"]').uncheck();
cy.get('input[type="checkbox"]').should('not.be.checked');
})
.else()
.then(() => {
cy.get('input[type="checkbox"]').check();
cy.get('input[type="checkbox"]').should('be.checked');

})

}


}

export default OrganizationLists;