import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";
import TestData from "../../Variables/TestData";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import OrganizationLists from "../../../support/page_objects/Account/Lists/OrganizationLists";



describe('Private/Shared lists', ()=> {

const catalogPage = new CatalogPage();
const loginPage = new LoginPage();
const listsPage = new Lists();
const cartPage = new CartPage();
const orgList = new OrganizationLists();

//const SUBCATEGORY = 'tv-multimedia';
const SUBCATEGORY = 'soft-drinks/soda';
const NEWCATEGORY = 'snacks';
//const NEWCATEGORY = 'tyres';

beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
cy.viewport(Cypress.env('DEVICE_NAME'));
loginPage.login(userData.userData[1].email, userData.userData[1].password);
cartPage.emptyOrNot();
listsPage.isListsPageEmpty();  

});

it('Create private list. Edit name and description. Change scope from private to Shared', ()=> {


orgList.createList();
listsPage.checkProductCounter();
orgList.checkMenuDropDown('Share');
orgList.clickOnDropDownBtn('Edit');
orgList.editOrgList()
cy.checkLabel('Shared');
orgList.checkMenuDropDown('Make private');
listsPage.goToListDetailsPage();
orgList.clickOnListSettingsBtn();
orgList.editOrgList();
listsPage.emptyListDetailPage();
listsPage.clickToListsRouter();
cy.checkLabel('Private');
orgList.checkMenuDropDown('Share');


});


it('Create private list from catalog. Edit name and description', ()=> {

catalogPage.visit(SUBCATEGORY);
catalogPage.clickOnSingleHEART();
catalogPage.addProductToNewList();
catalogPage.clickInTheList();
cy.checkLabel('Private');
catalogPage.checkAlreadyInList();
listsPage.checkNewList();
listsPage.editList();
cy.checkLabel('Private');
orgList.checkMenuDropDown('Share');
    
})

it('Create a Shared list. Edit name and description. Change scope from Shared to Private', () => {

orgList.createSharedList();
cy.checkLabel('Shared');
listsPage.checkProductCounter();
orgList.checkMenuDropDown('Make private');
orgList.clickOnDropDownBtn('Edit');
orgList.editOrgList()
cy.checkLabel('Private');
orgList.checkMenuDropDown('Share');
listsPage.goToListDetailsPage();
orgList.clickOnListSettingsBtn();
orgList.editOrgList();
listsPage.emptyListDetailPage();
listsPage.clickToListsRouter();
cy.checkLabel('Shared');
orgList.checkMenuDropDown('Make private');

})

it('Add products to Shared list', () => {

orgList.createSharedList();
cy.checkLabel('Shared');
orgList.checkMenuDropDown('Make private');
catalogPage.visit(NEWCATEGORY);
cy.scrollTo('top');
catalogPage.prepareProductsForList();
cy.wait(500);
listsPage.goToListTab();
cy.checkLabel('Shared');
orgList.checkMenuDropDown('Make private');
listsPage.checkProductCounter();
listsPage.compareProductsCount();

})

it.skip('Create lists. Switch between lists', () => {

orgList.createSharedList();
listsPage.createMultipleLists();
listsPage.goToListDetailsPage();
listsPage.compareListsNames();
listsPage.listCounter();
listsPage.listSwitcher();


})
})

