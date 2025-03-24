import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage"; 
import userData from "../../Variables/userData";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import OrganizationLists from "../../../support/page_objects/Account/Lists/OrganizationLists";
import AuthLogin from "../../../support/navigation/AuthLogin";
import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";

describe('Private/Shared lists', ()=> {

const catalogPage = new CatalogPage();
const loginPage = new LoginPage();
const listsPage = new Lists();
const cartPage = new CartPage();
const orgList = new OrganizationLists();
const productPage = new ProductPage();

const SUBCATEGORY = 'printers';


beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
AuthLogin.setDimensions();
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

productPage.visit(SUBCATEGORY);
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
productPage.visit(SUBCATEGORY);
cy.scrollTo('top');
catalogPage.prepareProductsForList(4);
cy.wait(500);
listsPage.goToListTab();
cy.checkLabel('Shared');
orgList.checkMenuDropDown('Make private');
listsPage.checkProductCounter();
listsPage.compareProductsCount();

})

})

