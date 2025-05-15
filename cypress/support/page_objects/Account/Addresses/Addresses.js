import { AddressesLocators } from "./AddressesLocators";

class Addresses {

openAddressesPage() {

cy.get('[href="/account/dashboard"]').click();
cy.url().should('include', '/account/dashboard');
cy.contains('Addresses').should('be.visible');
cy.get('[href="/account/addresses"]').click();
cy.url().should('include', '/account/addresses');
cy.get('h1').contains('Addresses').should('be.visible');

}

removeAddress() {

cy.get('tr[class="even:bg-neutral-50"]').should('have.length', 1);
cy.get(AddressesLocators.ACTION_BTN).click();
cy.xpath(AddressesLocators.DROP_DOWN).should('be.visible');
cy.xpath(AddressesLocators.DROP_DOWN_ITEM).contains('Delete').click();
cy.confirmAction('Delete address', 'OK');

}

emptyAddresses() {

cy.get(AddressesLocators.EMPTY_VIEW_TEXT)
.should('be.visible')
.and('have.text', 'You do not have any addresses yet');

}

emptyOrNot() {

this.openAddressesPage();
cy.wait(2000);
cy.get('tr[class="even:bg-neutral-50"]')
.if($el => $el.length > 0)
.then(() => {
this.clearAddresses();
cy.log('Addresses are empty');
})
.else(() => {
cy.get('.vc-empty-view__buttons > .vc-button').should('be.visible');
this.emptyAddresses();
cy.log('Addresses are empty');

})

}

clearAddresses() {

this.removeAddress();
this.emptyAddresses();

}


}

export default Addresses;