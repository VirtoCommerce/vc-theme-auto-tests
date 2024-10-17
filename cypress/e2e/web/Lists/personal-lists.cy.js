import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";
import TestData from "../../Variables/TestData";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import Lists_data from "../../../support/page_objects/Account/Lists/Lists_data";
import ProductCard from "../../../support/page_objects/CatalogPage/ProductCard";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import SelectForCheckout from "../../../support/page_objects/CheckoutFlow/SelectForCheckout";



describe('Personal Lists', ()=> {
   
const catalogPage = new CatalogPage();
const loginPage = new LoginPage();
const listsPage = new Lists();
const cartPage = new CartPage();
const selectForCheckout = new SelectForCheckout();

//const SUBCATEGORY = 'art';
const SUBCATEGORY = 'drinks-and-food';
const NEWCATEGORY = 'soft-drinks/soda';
//const NEWCATEGORY = 'tyres';


beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
cy.viewport(Cypress.env('DEVICE_NAME'));
loginPage.login(userData.userData[0].email, userData.userData[0].password);
cartPage.emptyOrNot();
listsPage.isListsPageEmpty();
       
});

it('Add new List. Remove the product from the list in the Grid view and PDP', () => {

catalogPage.visit(SUBCATEGORY);
catalogPage.addToListFromListView();
catalogPage.clickInTheList();
catalogPage.checkAlreadyInList();
listsPage.goToListTab();
listsPage.deleteMultipleLists();
catalogPage.visit(NEWCATEGORY);
catalogPage.clickOnHEARTs();
catalogPage.openProductPage();
ProductCard.isActive();
catalogPage.clickInTheList();
catalogPage.checkAlreadyInList();
catalogPage.clickInTheList();
catalogPage.removeProductFromLists();
ProductCard.isInactive();
cy.go('back');
cy.log('Backward');
ProductCard.isActive();
catalogPage.clickOnSingleHEART();
catalogPage.allUnchecked();
cy.clickOnButton("Cancel");

    
})

it('Icon is red > Add several products to existing list from List view.', () => {

listsPage.createListData();
catalogPage.visit('printers/multifunction-printers');
cy.switchProductView('List');
catalogPage.prepareProductsForList();
listsPage.checkNewList();

                    
})

it('Lists tab > create new lists. Add product to several Lists from Grid and from PDP. Delete lists', 
() => {

listsPage.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
listsPage.goToListDetailsPage();
listsPage.emptyListDetailPage(Lists_data.lists[0].name1);
listsPage.compareListsNames();
listsPage.clickToListsRouter();
listsPage.editList();    
listsPage.createMultipleLists();
catalogPage.visit(SUBCATEGORY);
catalogPage.clickOnSingleHEART();
catalogPage.checkAddNewList();
catalogPage.allUnchecked();
catalogPage.addToExistList();
catalogPage.clickInTheList();
catalogPage.checkAlreadyInList();
catalogPage.visit(TestData.defaultProductPage);
ProductCard.isInactive();
catalogPage.clickOnHeartTFromPDP();
catalogPage.addToExistList();
catalogPage.clickOnHeartTFromPDP();
catalogPage.checkAddNewList();
catalogPage.checkAlreadyInList();
ProductCard.isActive();
listsPage.checkNewList();


})

it.only('Lists tab > List with Products > Add 1 product to the cart > Successfully added. Add all to cart.', ()=> {

listsPage.createListData();
catalogPage.visit(NEWCATEGORY);
cy.get('div[search-params]').should('be.visible');
catalogPage.prepareProductsForList();
listsPage.checkNewList();
listsPage.clickOnAddToCart();
listsPage.clickOnViewCart();
cy.log('Check added product to cart');
cy.checkLoading('.vc-loader-overlay__spinner');        
cartPage.cartLineItemsCheck();
selectForCheckout.SelectedState();
cartPage.clearCart();
cartPage.confirmClearCart();
listsPage.goToListTab();
listsPage.goToListDetailsPage();
listsPage.clickOnAddAllToCart();
listsPage.clickOnViewCart();
cy.log('Check products in cart');
cy.checkLoading('.vc-loader-overlay__spinner');        
cartPage.cartLineItemsCheck();
selectForCheckout.SelectedState();
cartPage.clearCart();
cartPage.confirmClearCart();

});

it('Lists tab > List with Products > remove product', ()=> {

listsPage.createListData();
catalogPage.visit(NEWCATEGORY);
catalogPage.prepareProductsForList();
listsPage.checkNewList();
listsPage.removeProductsFromAllPages();
listsPage.emptyListDetailPage();
listsPage.clickToListsRouter();
listsPage.checkProductCounter();

    
});

it('Save changes', () => {

listsPage.createListData();
catalogPage.visit(SUBCATEGORY);
catalogPage.prepareProductsForList();
listsPage.checkNewList();
listsPage.updateQuantityInList();
listsPage.leaveList();

});

it('Product counter', () => {

listsPage.createListData();
catalogPage.visit(SUBCATEGORY);
catalogPage.prepareProductsForList();
listsPage.goToListTab();
listsPage.compareProductsCount();
listsPage.removeSingleProduct();
cy.wait(500);
listsPage.clickToListsRouter();
listsPage.compareProductsCount();

})


});

describe('Anonymous', ()=> {

const catalogPage = new CatalogPage();
const NEWCATEGORY = 'soft-drinks/soda';

beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
cy.viewport(Cypress.env('DEVICE_NAME')); 
    
           
});

it('Icon is grey > Add product anonymously', ()=> {

catalogPage.visit(NEWCATEGORY); 
catalogPage.addToListAnonim();
catalogPage.openProductPage();
catalogPage.clickOnHeartTFromPDP();
catalogPage.addToListAnonimProductPage();

});
})
