import { ListsLocators } from "../ListsLocators";{}

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

createPersonalList(){

cy.log('Create a new list')
cy.contains('button', 'Create list').click();
cy.get('h3').should('be.visible').and('have.text', 'New List');
cy.get('input[type="text"]').eq(1).type('Cypress test name');
cy.get('textarea').type('Personal list');
cy.get('.flex-wrap > .vc-button--color--primary').should('have.text', 'Create list').click();

cy.log('Check created list')
cy.contains('a', 'Cypress test name');


}

emptyListDetailPage(){

cy.contains('a', "Cypress test name").click();

}

}

export default Lists;