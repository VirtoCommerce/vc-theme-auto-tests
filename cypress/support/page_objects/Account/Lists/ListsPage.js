import { ListsLocators } from "../ListsLocators";
//import Lists_data from "./Lists_data";


class Lists{

goToListTab(){

cy.log('Go to Lists tab')
cy.get(ListsLocators.LISTS_TAB).click();
cy.location('pathname').should('eq', "/account/lists");


}

emptyListsPageView(){

cy.log('Check empty Lists view')
cy.contains('h2', 'Lists').should('be.visible');
cy.get('.mx-5 > img').should('be.visible');
cy.get('.text-xl').should('have.text', "You have not created any lists yet")
cy.get('.mx-5 > .vc-button').contains('Create list');

}

createPersonalList(list_name, list_description){

cy.log('Create a new list')
cy.contains('button', 'Create list').click();
cy.get('h3').should('be.visible').and('have.text', 'New List');
cy.get('input[type="text"]').eq(1).type(list_name);
cy.get('textarea').type(list_description);
cy.get('.flex-wrap > .vc-button--color--primary').should('have.text', 'Create list').click();

cy.log('Check created list')
cy.contains('a', list_name);


}

emptyListDetailPage(list_name){

cy.contains('a', list_name).click();
cy.get('h2').should('have.text', list_name);
cy.get('.text-xl').should('have.text', 'Your list is empty');
cy.contains('a', 'Continue browsing');

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
}

}

export default Lists;