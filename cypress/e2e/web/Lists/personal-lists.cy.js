import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";
import TestData from "../../Variables/TestData";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import Lists_data from "../../../support/page_objects/Account/Lists/Lists_data";
import ProductCard from "../../../support/page_objects/CatalogPage/ProductCard";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import SelectForCheckout from "../../../support/page_objects/CheckoutFlow/SelectForCheckout";
import AuthLogin from "../../../support/navigation/AuthLogin";
import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";


describe('Personal Lists', ()=> {
   
const catalogPage = new CatalogPage();
const loginPage = new LoginPage();
const listsPage = new Lists();
const cartPage = new CartPage();
const selectForCheckout = new SelectForCheckout();
const productPage = new ProductPage();
const productCard = new ProductCard();

const NEWCATEGORY = 'printers';
const CATALOG = 'catalog';



beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
AuthLogin.setDimensions();
loginPage.login(userData.userData[0].email, userData.userData[0].password);
cartPage.emptyOrNot();
listsPage.isListsPageEmpty();
       
});

it.skip('Add new List. Remove the product from the list in the Grid view and PDP', () => {

productPage.visit(NEWCATEGORY);
catalogPage.addToListFromListView();
catalogPage.clickInTheList();
catalogPage.checkAlreadyInList();
listsPage.goToListTab();
listsPage.deleteMultipleLists();
catalogPage.visit(CATALOG);
catalogPage.clickOnHEARTs(11);
catalogPage.openProductPage();
productCard.isActive();
catalogPage.clickInTheList();
catalogPage.checkAlreadyInList();
catalogPage.clickInTheList();
catalogPage.removeProductFromLists();
productCard.isInactive();
cy.go('back');
cy.log('Backward');
productCard.isActive();
catalogPage.clickOnSingleHEART();
catalogPage.allUnchecked();
cy.clickOnButton("Cancel");

    
})

it('Icon is red > Add several products to existing list from List view.', () => {

listsPage.createListData();
catalogPage.visit(CATALOG);
cy.switchProductView('List');
catalogPage.prepareProductsForList(5);
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
catalogPage.visit(CATALOG);
catalogPage.clickOnSingleHEART();
catalogPage.checkAddNewList();
catalogPage.allUnchecked();
catalogPage.addToExistList();
catalogPage.clickInTheList();
catalogPage.checkAlreadyInList();
productPage.visit(TestData.defaultProductPage);
productCard.isInactive();
catalogPage.clickOnHeartTFromPDP();
catalogPage.addToExistList();
catalogPage.clickInTheList();
catalogPage.checkAddNewList();
catalogPage.checkAlreadyInList();
productCard.isActive();
listsPage.checkNewList();


})

it('Lists tab > List with Products > Add 1 product to the cart > Successfully added. Add all to cart.', ()=> {

listsPage.createListData();
productPage.visit(NEWCATEGORY);
cy.get('div[search-params]').should('be.visible');
catalogPage.prepareProductsForList(6);
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
catalogPage.visit(CATALOG);
catalogPage.prepareProductsForList(8);
listsPage.checkNewList();
listsPage.removeProductsFromAllPages();
listsPage.emptyListDetailPage();
listsPage.clickToListsRouter();
listsPage.checkProductCounter();

    
});

it('Save changes', () => {

listsPage.createListData();
productPage.visit(NEWCATEGORY);
catalogPage.prepareProductsForList(6);
listsPage.checkNewList();
listsPage.updateQuantityInList();
listsPage.leaveList();

});

it('Product counter', () => {

listsPage.createListData();
catalogPage.visit(CATALOG);
catalogPage.prepareProductsForList(6);
listsPage.goToListTab();
listsPage.compareProductsCount();
listsPage.removeSingleProduct();
cy.wait(1000);
listsPage.clickToListsRouter();
listsPage.compareProductsCount();

})

afterEach(() => {
    listsPage.isListsPageEmpty();
  });


});

describe('Anonymous', ()=> {

const catalogPage = new CatalogPage();
const CATALOG = 'catalog';

beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
AuthLogin.setDimensions();
    
           
});

it('Icon is grey > Add product anonymously', ()=> {

catalogPage.visit(CATALOG); 
catalogPage.addToListAnonim();
catalogPage.openProductPage();
catalogPage.addToListAnonimProductPage();

});
})
