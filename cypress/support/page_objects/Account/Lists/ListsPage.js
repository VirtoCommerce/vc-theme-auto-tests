import { ListsLocators } from "../ListsLocators";
import Lists_data from "./Lists_data";


class Lists{

goToListTab(){

cy.log('Go to Lists tab')
cy.get(ListsLocators.LISTS_TAB).click();
cy.location('pathname').should('eq', "/account/lists");


}

emptyListsPageView(){

cy.log('Check empty Lists view');
cy.contains('h2', 'Lists').should('be.visible');
cy.get('.mx-5 > img').should('be.visible');
cy.get('.text-xl').should('have.text', "You have not created any lists yet");
cy.get('.mx-5 > .vc-button').contains('Create list');

}

emptyListDetailPage(){

this.goToListDetailsPage();
cy.get('.text-xl').should('have.text', 'Your list is empty');
cy.contains('a', 'Continue browsing');
cy.contains('button','Add all to cart').should('be.disabled');
cy.contains('button', 'Save Changes').should('be.disabled');
cy.contains('button', 'List settings').should('be.enabled');
    
}

goToListDetailsPage(){

cy.log('Open list details page');
cy.get(ListsLocators.LISTS_TITLE).eq(0).click();

}

createPersonalList(list_name, list_description){

cy.log('Create a new list')
cy.contains('button', 'Create list').click();
cy.get('h3').should('be.visible').and('have.text', 'New List');
cy.get('input[type="text"]').eq(1).type(list_name);
cy.get('textarea').type(list_description);
cy.get('.flex-wrap > .vc-button--color--primary').should('have.text', 'Create list').click();
cy.contains('h3', 'New List').should('not.exist');
cy.log('Check created list')
cy.contains('a', list_name);


}

createLists(){

// Generate a random number between 0 and 100
const randomNumber = Lists_data.getRandomNumber();
// Generate a random word
const randomWord = Lists_data.getRandomWord();

cy.contains('button', 'Create list')
.if('enabled')
.then(() => {
cy.contains('button', 'Create list').should('be.visible').click();
cy.get('h3').should('be.visible').and('have.text', 'New List');
cy.get('input[type="text"]').eq(1).type(randomWord + randomNumber);
cy.get('textarea').type(Lists_data.lists[0].description1 + ' ' + randomWord + randomNumber);
cy.get('.flex-wrap > .vc-button--color--primary').should('have.text', 'Create list').click();
cy.contains('h3', 'New List').should('not.exist');
      
})
.else('disabled')
.then(() => {
cy.get('.justify-between > .vc-button').should('be.disabled')
cy.log('Create list button is disabled');

}); 
}


createMultipleLists(){

this.createLists();
this.createLists();
this.createLists();
this.createLists();
this.createLists();
this.createLists();
this.createLists();
this.createLists();
this.createLists();
this.createLists();


}


checkListsAfterCreated(){

cy.log('Check created lists')
cy.get('.text-xl')
.should('not.exist')
cy.get(ListsLocators.LISTS_TITLE).its('length').should('gte', 1);
cy.get(ListsLocators.LISTS_TITLE).eq(0).click();

}

editListFromSettings(list_name, list_description){

cy.log('Edit list name');
cy.get(ListsLocators.SETTINGS_WHEEL).eq(0).click();
cy.get(ListsLocators.DROP_DOWN).should('be.visible');
cy.get('.vc-menu-item').contains('Edit').click();
cy.get('h3').should('be.visible').and('have.text', "List Settings");
cy.contains('button', 'Save').should('be.disabled');
cy.get('input[type="text"]').eq(1).clear();
cy.get('input[type="text"]').eq(1).type(list_name);
cy.get('textarea').clear();
cy.get('textarea').type(list_description);
cy.contains('button', 'Save').should('be.enabled').click();
cy.contains('h3', "List Settings").should('not.exist');
cy.log('The name of list is updated');


}

editListFromDetailsPage(list_name, list_description){

cy.log('Edit list from details page');
cy.contains('button', 'List settings').should('be.enabled').click();
cy.get('h3').should('be.visible').and('have.text', "List Settings");
cy.contains('button', 'Save').should('be.disabled');
cy.get('input[type="text"]').eq(1).clear();
cy.get('input[type="text"]').eq(1).type(list_name);
cy.get('textarea').clear();
cy.get('textarea').type(list_description);
cy.get('.inline-block > .flex-wrap > .vc-button--color--primary').should('be.enabled').click();
cy.contains('h3', "List Settings").should('not.exist');
cy.log('The name of list is updated');
    
}


compareListsNames(){

cy.log('Compare list name in the left menue and current list title')
cy.get('a[aria-current="page"]').last().invoke('text').then((text1) => {
cy.get('.truncate').invoke('text').then((text2) => {
expect(text1).to.equal(text2)
cy.log('The lists title are equal');
});
});

}

clickToListsRouter(){
cy.get(ListsLocators.ROUTER_LINK).click();
cy.location('pathname').should('eq', "/account/lists");
}

switchBetweenLists(){

cy.get('div[class="ml-4 flex items-center space-x-2 overflow-hidden text-ellipsis px-3 text-sm"]').last().click();
this.compareListsNames();
}

checkListDetailsPage(){

cy.log('check List Details Page');
cy.get('.text-xl').should('not.exist');
cy.contains('button','Add all to cart').should('be.enabled');
cy.contains('button', 'Save Changes').should('be.disabled');
cy.contains('button', 'List settings').should('be.enabled');
cy.get('.vc-line-item').should('exist');

}

deleteList(){

cy.log('Delete list')
cy.get('.text-xl')
.if('not.exist')
.then(()=> {
cy.get(ListsLocators.SETTINGS_WHEEL).eq(0).click();
cy.get(ListsLocators.DROP_DOWN).should('be.visible');
cy.get('.vc-menu-item').contains('Delete').click();
cy.get('h3').should('have.text', "Confirm Delete").and('be.visible');
cy.contains('.vc-button--color--danger', "Delete").click();
cy.contains('h3', 'Confirm Delete').should('not.exist');
cy.log('The list was deleted');
})

.else()
.then(() => {
this.emptyListsPageView();
cy.log('All lists were deleted')  
})

}

deleteMultipleLists() {

let elementsLength;

cy.get(ListsLocators.LISTS_TITLE)
.should('have.length.gte', 1)
.then((elements) => {
elementsLength = elements.length;
    
elements.each((element, index) => {
console.log(index + 1);
this.deleteList();

});
});   

}
}

export default Lists;