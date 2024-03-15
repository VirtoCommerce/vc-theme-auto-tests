import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";
import TestData from "../../Variables/TestData";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import Lists_data from "../../../support/page_objects/Account/Lists/Lists_data";
import ProductCard from "../../../support/page_objects/CatalogPage/ProductCard";


describe('Personal Lists', ()=> {
   
const catalogPage = new CatalogPage();
const loginPage = new LoginPage();
const listsPage = new Lists();


beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
cy.viewport(Cypress.env('DEVICE_NAME'));

       
});

it('Star is grey > Add product anonymously', ()=> {

catalogPage.visit('catalog');
cy.get('h2').should('be.visible');
catalogPage.addToListAnonim();
catalogPage.openProductPage();
catalogPage.clickOnStarFromPDP();
catalogPage.addToListAnonimProductPage();

});

it('Add new List. Remove the product from the list in the Grid view and PDP', () => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
listsPage.goToListTab();
listsPage.emptyListsPageView();
catalogPage.visit('catalog');
cy.get('h2').should('be.visible');
catalogPage.addToListFromListView();
catalogPage.clickOnSingleStar();
catalogPage.checkAlreadyInList();
listsPage.goToListTab();
listsPage.deleteMultipleLists();
catalogPage.visit('soft-drinks/soda');
catalogPage.clickOnStars();
catalogPage.openProductPage();
ProductCard.isStarOrangePDP();
catalogPage.clickOnStarFromPDP();
catalogPage.checkAlreadyInList();
catalogPage.clickOnStarFromPDP();
catalogPage.removeProductFromLists();
ProductCard.isStarGreyPDP();
cy.go('back');
cy.log('Back to soft-drinks-soda');
ProductCard.isStarGrey();
catalogPage.clickOnSingleStar();
catalogPage.allUnchecked();
cy.clickOnButton("Cancel");
listsPage.goToListTab();
listsPage.deleteMultipleLists();
    
})

it('Star is orange > Add several products to existing list from List view.', () => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
listsPage.goToListTab();
listsPage.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
listsPage.goToListDetailsPage();
listsPage.emptyListDetailPage();
cy.clickOnContinue("Continue browsing");
catalogPage.visit('juice');
cy.switchProductView('List');
catalogPage.addProductsToExistList();
catalogPage.clickOnSingleStar();
catalogPage.checkAlreadyInList();
listsPage.goToListTab();
listsPage.checkListsAfterCreated();
listsPage.checkListDetailsPage();
listsPage.clickToListsRouter();
listsPage.deleteMultipleLists();
                    
})

it('Lists tab > create new lists. Add product to several Lists from Grid and from PDP. Delete lists', 
() => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
listsPage.goToListTab();
listsPage.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
listsPage.goToListDetailsPage();
listsPage.emptyListDetailPage(Lists_data.lists[0].name1);
listsPage.compareListsNames();
listsPage.clickToListsRouter();

listsPage.editListFromSettings(Lists_data.lists[1].name2, Lists_data.lists[1].description2);
listsPage.goToListDetailsPage(Lists_data.lists[1].name2);
listsPage.compareListsNames();

listsPage.editListFromDetailsPage(Lists_data.lists[2].name3, Lists_data.lists[2].description3)
listsPage.compareListsNames();
listsPage.clickToListsRouter();
    
listsPage.createMultipleLists();

catalogPage.visit('juice');
catalogPage.clickOnSingleStar();
catalogPage.checkAddNewList();
catalogPage.allUnchecked();
catalogPage.addToExistList();
catalogPage.clickOnSingleStar();
catalogPage.checkAlreadyInList();
catalogPage.visit(TestData.defaultProductPage);
ProductCard.isStarGreyPDP();
catalogPage.clickOnStarFromPDP();
catalogPage.addToExistList();
catalogPage.clickOnStarFromPDP();
catalogPage.checkAddNewList();
catalogPage.checkAlreadyInList();
ProductCard.isStarOrangePDP();
listsPage.goToListTab();
listsPage.checkListsAfterCreated();
listsPage.checkListDetailsPage();
listsPage.clickToListsRouter();
listsPage.deleteMultipleLists(); 

})


it('Lists tab > List with Products > remove product', ()=> {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
listsPage.goToListTab();
listsPage.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
listsPage.goToListDetailsPage();
listsPage.emptyListDetailPage();
cy.clickOnContinue("Continue browsing");
catalogPage.visit('soda');
catalogPage.addProductsToExistList();
catalogPage.clickOnSingleStar();
catalogPage.checkAlreadyInList();
listsPage.goToListTab();
listsPage.checkListsAfterCreated();
listsPage.checkListDetailsPage();
listsPage.removeProductsFromAllPages();
listsPage.emptyListDetailPage();
    
});


})