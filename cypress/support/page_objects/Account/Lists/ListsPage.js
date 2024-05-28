import { ListsLocators } from "../ListsLocators";
import Lists_data from "./Lists_data";

class Lists{

goToListTab(){

cy.log('Go to Lists tab')
cy.get(ListsLocators.LISTS_TAB).last().click();
cy.location('pathname').should('eq', "/account/lists");


}

isListsPageEmpty(){
   
cy.log("Verify lists page is empty");
this.goToListTab();
cy.wait(1000);
cy.get(ListsLocators.LISTS_TITLE)
.if('visible')
.then(()=>{
this.deleteMultipleLists();
})
.else()
.then(()=>{
this.emptyListsPageView();

})

}

emptyListsPageView(){

cy.log('Check empty Lists view');
cy.get('.vc-typography--variant--h1').contains('Lists');
cy.get('.mx-5 > img').should('be.visible');
cy.get('.text-xl').should('have.text', "You have not created any lists yet");
cy.get('.mx-5 > .vc-button').contains('Create list');
cy.log('The lists page is empty');

}

emptyListDetailPage(){

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
this.checkProductCounter();


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
this.checkProductCounter();
cy.get(ListsLocators.LISTS_TITLE).eq(0).click();


}

compareProductsCount(){
// Retrieve the text content of the counter element and save it to productCount variable
cy.get(ListsLocators.COUNTER)
.eq(0)
.invoke('text')
.then((count1) => {
const productCount = parseInt(count1.trim()); // Parse the text content into an integer
cy.log(`Product counter is: ${productCount}`);

// Navigate to the list details page
 this.goToListDetailsPage();

// Count the number of line item elements and compare with productCount
cy.get(ListsLocators.LINE_ITEM)
.its('length')
.then((count2) => {
const lineItemCount = count2;
cy.log(`Number of elements found: ${lineItemCount}`);

// Assertion to compare productCount with lineItemCount
expect(productCount).to.equal(lineItemCount);
cy.log(`The product count at badge: ${productCount} is equal to line-items in list: ${lineItemCount}`);

});
});


}

checkProductCounter(){

// Retrieve the text content of the counter element and save it to productCount variable
cy.get(ListsLocators.COUNTER)
.eq(0)
.invoke('text')
.then((count1) => {
const productCount = parseInt(count1.trim()); // Parse the text content into an integer
cy.log(`Product counter is: ${productCount}`);

});
}


editListFromSettings(list_name, list_description){

cy.log('Edit list name');
cy.get(ListsLocators.SETTINGS_WHEEL).eq(0).click();
cy.get(ListsLocators.DROP_DOWN).should('be.visible');
cy.get(ListsLocators.DROP_DOWN_ITEM).contains('Edit').click();
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
cy.get('a[aria-current="page"]').eq(0).invoke('text').then((text1) => {
cy.get('.vc-typography').invoke('text').then((text2) => {
expect(text1).to.equal(text2)
cy.log('The lists title are equal');
});
});

}

editList() {

this.compareListsNames();
this.clickToListsRouter();
    
this.editListFromSettings(Lists_data.lists[1].name2, Lists_data.lists[1].description2);
this.goToListDetailsPage(Lists_data.lists[1].name2);
this.compareListsNames();
    
this.editListFromDetailsPage(Lists_data.lists[2].name3, Lists_data.lists[2].description3)
this.compareListsNames();
this.clickToListsRouter();

}

clickToListsRouter(){
cy.get(ListsLocators.ROUTER_LINK).last().click();
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
cy.get(ListsLocators.DROP_DOWN_ITEM).contains('Delete').click();
cy.confirmDelete();
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

})
})   

}

removeSingleProduct(){
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
})
}

testRemove(){

let batchCount = 0;

// Delete elements in batches of 6 until none are left
do {
this.removeSingleProduct();
batchCount++;
} 
while (batchCount < 6);
}

removeProductsFromAllPages(){

let elementsLength;

cy.get('.vc-pagination__page')
.should('have.length.gte', 1)
.then((elements) => {
elementsLength = elements.length;          
cy.log(`Number of elements: ${elementsLength}`);

for (let page = 1; page <= elementsLength ; page++) {
// Delete elements in batches on the current page
this.testRemove();

}

});


}

clickOnAddAllToCart(){

cy.contains('button','Add all to cart').click();


}

clickOnAddToCart(){

cy.contains('button','Add to cart').eq(0).click();

    
}

clickOnViewCart(){

cy.checkAddingProductsToCart();
cy.contains('button', "Successfully added").should('be.visible');
cy.contains('a', "View cart").click();
cy.location('pathname').should('eq', "/cart");

}

createListData(){

this.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
this.goToListDetailsPage();
this.emptyListDetailPage();
cy.clickOnContinue("Continue browsing");
cy.get('.vc-typography > span').should('be.visible').and('have.text', 'Catalog');

}

checkNewList(){

this.goToListTab();
this.checkListsAfterCreated();
this.checkListDetailsPage();

}

changeQuantity(value1, value2){

cy.get(ListsLocators.INPUT).eq(value1).clear().type(value2);
    
}
    
saveChanges(value){
    
this.changeQuantity(1, 2);
cy.contains('button', 'Save Changes').should('be.enabled').click();
this.saveChangesPopUp();
cy.clickOnButton(value);
cy.get('h3').should('not.exist');
cy.contains('button', 'Save Changes').should('be.disabled');
    
    
}
    
saveChangesPopUp(){
    
cy.get('h3').should('be.visible').and('have.text', 'Save Changes');
cy.get('p').contains('Would you like to save changes in the list?');
cy.contains('button', 'Yes').should('be.enabled');
cy.contains('button', 'No').should('be.enabled');
}
    
updateQuantityInList(){

cy.log('Check qty update > Save chenges')
this.saveChanges('No');
this.saveChanges('Yes');
    
}
    
leaveList(){
cy.log('Change qty > leave the list > Save changes > Yes');   
this.changeQuantity(3, 5);
cy.get(ListsLocators.ROUTER_LINK).click();
this.saveChangesPopUp();
cy.clickOnButton('Yes');
cy.location('pathname').should('eq', "/account/lists");
this.goToListDetailsPage();

cy.log('Change qty > leave the list > Save changes > No');
this.changeQuantity(4, 6);
cy.get(ListsLocators.ROUTER_LINK).click();
this.saveChangesPopUp();
cy.clickOnButton('No');
cy.location('pathname').should('eq', "/account/lists");
    
}

}



export default Lists;