import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";
import TestData from "../../Variables/TestData";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import Lists_data from "../../../support/page_objects/Account/Lists/Lists_data";
import ProductCard from "../../../support/page_objects/CatalogPage/ProductCard";


describe('Organization lists', ()=> {

const catalogPage = new CatalogPage();
const loginPage = new LoginPage();
const listsPage = new Lists();

beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
cy.viewport(Cypress.env('DEVICE_NAME'));
        
               
});

it('Create private list. Edit name and description', ()=> {

loginPage.login(userData.userData[1].email, userData.userData[1].password);
listsPage.goToListTab();
listsPage.emptyListsPageView();
listsPage.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
catalogPage.visit('juice');
catalogPage.addProductsToExistList();
catalogPage.clickOnSingleStar();
catalogPage.checkAlreadyInList();
listsPage.goToListTab();
listsPage.checkListsAfterCreated();
listsPage.checkListDetailsPage();
listsPage.clickToListsRouter();

listsPage.editListFromSettings(Lists_data.lists[1].name2, Lists_data.lists[1].description2);
listsPage.goToListDetailsPage(Lists_data.lists[1].name2);
listsPage.compareListsNames();

listsPage.editListFromDetailsPage(Lists_data.lists[2].name3, Lists_data.lists[2].description3)
listsPage.compareListsNames();
listsPage.clickToListsRouter();
})
        
})