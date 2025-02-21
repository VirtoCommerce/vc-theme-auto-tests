import { ListsLocators } from "../ListsLocators";
import Lists_data from "../Lists/Lists_data";
import { CartPageLocators } from "../../CartPage/CartPageLocators/CartPageLocators";

class OrganizationLists {

createList(){
// Generate a random number between 0 and 100
const randomNumber = Lists_data.getRandomNumber();
// Generate a random word
const randomWord = Lists_data.getRandomWord();

cy.log('Create a new list');
cy.contains('button', 'Create list').click();

cy.get(CartPageLocators.DIALOG_TITLE).should('be.visible').and('have.text', 'New List');
cy.get('input[aria-checked="false"]').should('exist'); // Verify switcher state
cy.get('input[aria-checked="false"]').should('have.value', 'false'); // Ensure switcher is checked

// Fill in the list name and description
cy.get(CartPageLocators.DIALOG_TITLE).should('have.text', 'New List');
cy.get(ListsLocators.LIST_NAME).type(Lists_data.lists[0].name1);
cy.get('textarea').type(Lists_data.lists[0].description1 + ' ' + randomWord + randomNumber);
cy.get(CartPageLocators.DIALOG_FOOTER).should('have.text', 'Create list').click();
cy.wait(500);
cy.contains(CartPageLocators.DIALOG_TITLE, 'New List').should('not.exist');
cy.log('Check created list');

// Verify that the newly created list name is visible
cy.contains('a', Lists_data.lists[0].name1).should('be.visible');
      
}

createSharedList(){

// Generate a random number between 0 and 100
const randomNumber = Lists_data.getRandomNumber();
// Generate a random word
const randomWord = Lists_data.getRandomWord();

cy.log('Create a new list');
cy.contains('button', 'Create list').click();
    
cy.get(CartPageLocators.DIALOG_TITLE).should('be.visible').and('have.text', 'New List');
cy.get('input[aria-checked="false"]').should('exist'); // Verify switcher state
cy.get('input[aria-checked="false"]').should('have.value', 'false'); // Ensure switcher is checked
    
// Fill in the list name and description
cy.get(ListsLocators.LIST_NAME).type(Lists_data.lists[3].name4);
cy.get('textarea').type(Lists_data.lists[3].description4 + ' ' + randomWord + randomNumber);
this.toggleSwitcher();
    
cy.contains(CartPageLocators.DIALOG_FOOTER, 'Create list').click();
cy.contains(CartPageLocators.DIALOG_TITLE, 'New List').should('not.exist');
cy.log('Check created list');
    
// Verify that the newly created list name is visible
cy.contains('a', Lists_data.lists[3].name4).should('be.visible');
          
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
    

editOrgList(){

// Generate a random number between 0 and 100
const randomNumber = Lists_data.getRandomNumber();
// Generate a random word
const randomWord = Lists_data.getRandomWord();

cy.log('Edit list');
cy.get(CartPageLocators.DIALOG_TITLE).should('be.visible').and('have.text', ListsLocators.LIST_SETTINGS);
cy.get('input[aria-checked="false"]').should('have.value', 'false');
cy.contains('button', 'Make shared');
cy.contains('button', 'Save').should('be.disabled');
cy.get(ListsLocators.LIST_NAME).clear();
cy.get(ListsLocators.LIST_NAME).type(randomWord + randomNumber);
cy.get('textarea').type(Lists_data.lists[0].description1 + ' ' + randomWord + randomNumber);
cy.get('textarea').clear();
cy.get('textarea').type(Lists_data.lists[1].description2 + ' ' + randomWord + randomNumber);
this.toggleSwitcher();
cy.get(CartPageLocators.DIALOG_FOOTER).should('be.enabled').click();
cy.contains(CartPageLocators.DIALOG_TITLE, ListsLocators.LIST_SETTINGS).should('not.exist');
cy.log('The name of list is updated');

}
    
    

toggleSwitcher(){

cy.get('input[aria-checked]')
.if('not.be.checked')
.then(() => {
cy.get(ListsLocators.SWITCHER_LABEL).last().click();
cy.get('[aria-checked="true"]').should('be.checked');
})
.else()
.then(() => {
cy.get(ListsLocators.SWITCHER_LABEL).last().click();
cy.get('[aria-checked="false"]').should('not.be.checked');

})

}


}

export default OrganizationLists;