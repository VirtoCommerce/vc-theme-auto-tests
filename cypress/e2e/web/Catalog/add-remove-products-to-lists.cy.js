import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";
import TestData from "../../Variables/TestData";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import Lists_data from "../../../support/page_objects/Account/Lists/Lists_data";


describe('Add/remove products to Lists', ()=> {
   
const catalogPage = new CatalogPage();
const productPage = new ProductPage();
const loginPage = new LoginPage();
const listsPage = new Lists();

const PDP = 'bolts/carriage-bolts/1-steel-carriage-bolt-grade-5-zinc-plated-finish-14-20-diathread-size-100-pk-fastener-length-1-thread-size-14-20';

beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
cy.viewport(Cypress.env('DEVICE_NAME'));

       
});

it('Star is grey > Add product anonymously', ()=> {

catalogPage.visit('catalog');
cy.get('h2').should('be.visible');
catalogPage.addToListAnonim();
productPage.visit(PDP);
catalogPage.addToListAnonimProductPage();

});

it('Star is orange > Add product to the wish list from List view', () => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
cy.get('h2').should('be.visible');
catalogPage.addToList();
productPage.visit(TestData.defaultProductPage);
catalogPage.addToListFromProductPage();

})

it('Lists tab > Lists > create new list', () => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
listsPage.goToListTab();
listsPage.emptyListsPageView();
listsPage.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
listsPage.emptyListDetailPage(Lists_data.lists[0].name1);
listsPage.compareListsNames();

cy.log('Create one more lists')
listsPage.clickToListsRouter();
listsPage.createPersonalList(Lists_data.lists[1].name2, Lists_data.lists[1].description2);
listsPage.emptyListDetailPage(Lists_data.lists[1].name2);
listsPage.compareListsNames();


})

it.only('Star is orange > Add product to existing wish list', () => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
cy.get('h2').should('be.visible');
catalogPage.visit('soft-drinks/soda')
catalogPage.addToExistList();
        
})
})