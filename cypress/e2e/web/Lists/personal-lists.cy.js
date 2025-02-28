import AuthLogin from "../../../support/navigation/AuthLogin";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import Lists from "../../../support/page_objects/Account/Lists/ListsPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import ProductCard from "../../../support/page_objects/CatalogPage/ProductCard";
import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";
import SelectForCheckout from "../../../support/page_objects/CheckoutFlow/SelectForCheckout";
import userData from "../../Variables/userData";
import Lists_data from "../../../support/page_objects/Account/Lists/Lists_data";

describe('Personal Lists', () => {
  const catalogPage = new CatalogPage();
  const loginPage = new LoginPage();
  const listsPage = new Lists();
  const cartPage = new CartPage();
  const selectForCheckout = new SelectForCheckout();
  const productPage = new ProductPage();
  const productCard = new ProductCard();

  const CATEGORY = 'printers';
  const CATALOG = 'catalog';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    AuthLogin.setDimensions();
    loginPage.login(userData.userData[0].email, userData.userData[0].password);
    cartPage.emptyOrNot();
    listsPage.isListsPageEmpty();
  });

  it('should add and remove products from list in Grid view and PDP', () => {
    productPage.visit(CATEGORY);
    catalogPage.clickOnHEARTs(11);
    productPage.openProductPage();
    productPage.checkProductPage();
    productCard.isActive();
    
    // Add to list and verify
    catalogPage.clickInTheList();
    catalogPage.checkAlreadyInList();
    
    // Remove from list and verify
    catalogPage.clickInTheList();
    catalogPage.removeProductFromLists();
    productCard.isInactive();
    
    cy.go('back');
    productCard.isActive();
    catalogPage.clickOnSingleHEART();
    catalogPage.allUnchecked();
    cy.clickOnButton("Cancel");
  });

  it.only('should add multiple products to existing list from List view', () => {
    listsPage.createListData();
    catalogPage.visit(CATALOG);
    cy.switchProductView('List');
    catalogPage.prepareProductsForList(5);
    listsPage.checkNewList();
  });

  it.only('should create lists, add products and delete lists', () => {
    // Create initial list
    listsPage.createPersonalList(Lists_data.lists[0].name1, Lists_data.lists[0].description1);
    listsPage.goToListDetailsPage();
    listsPage.emptyListDetailPage(Lists_data.lists[0].name1);
    listsPage.compareListsNames();
    listsPage.clickToListsRouter();
    
    // Edit and create multiple lists
    listsPage.editList();
    listsPage.createMultipleLists();
    
    // Add products to lists from catalog
    catalogPage.visit(CATALOG);
    catalogPage.clickOnSingleHEART();
    catalogPage.checkAddNewList();
    catalogPage.allUnchecked();
    catalogPage.addToExistList();
    catalogPage.clickInTheList();
    catalogPage.checkAlreadyInList();
    
    // Add products from PDP
    productPage.openProductPage();
    productCard.isActive();
    productCard.isInactive();
    catalogPage.clickOnHeartTFromPDP();
    catalogPage.addToExistList();
    catalogPage.clickInTheList();
    catalogPage.checkAddNewList();
    catalogPage.checkAlreadyInList();
    productCard.isActive();
    listsPage.checkNewList();
  });

  it.only('should add products from list to cart', () => {
    listsPage.createListData();
    productPage.visit(CATEGORY);
    cy.get('div[search-params]').should('be.visible');
    catalogPage.prepareProductsForList(6);
    listsPage.checkNewList();
    
    // Add single product to cart    
    catalogPage.addToCart(1);
    listsPage.clickOnViewCart();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.cartLineItemsCheck();
    selectForCheckout.SelectedState();
    cartPage.clearCart();
    cartPage.confirmClearCart();
    
    // Add all products to cart
    listsPage.goToListTab();
    listsPage.goToListDetailsPage();
    listsPage.clickOnAddAllToCart();
    listsPage.clickOnViewCart();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.cartLineItemsCheck();
    selectForCheckout.SelectedState();
    cartPage.clearCart();
    cartPage.confirmClearCart();
  });

  it.only('should handle list product management', () => {
    // Initial setup - prepare products once
    listsPage.createListData();
    catalogPage.visit(CATALOG);
    catalogPage.prepareProductsForList(6);
    listsPage.checkNewList();

    // Test product counter accuracy first
    listsPage.goToListTab();
    listsPage.compareProductsCount();
    listsPage.goToListTab();
    listsPage.goToListDetailsPage();

    // Test quantity updates and list navigation
    listsPage.updateQuantityInList();
    listsPage.leaveList();

    // Test removing products
    listsPage.goToListDetailsPage();
    listsPage.removeSingleProduct();
    cy.wait(1000);
    listsPage.clickToListsRouter();
    listsPage.compareProductsCount();

    listsPage.removeProductsFromAllPages();
    listsPage.emptyListDetailPage();
    listsPage.clickToListsRouter();
    listsPage.checkProductCounter();
  });

  afterEach(() => {
    listsPage.isListsPageEmpty();
  });
});

describe('Anonymous Lists', () => {
  const catalogPage = new CatalogPage();
  const productPage = new ProductPage();
  const CATALOG = 'catalog';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    AuthLogin.setDimensions();
  });

  it.only('should handle anonymous list interactions', () => {
    catalogPage.visit(CATALOG);
    catalogPage.addToListAnonim();
    productPage.openProductPage();
    productPage.checkProductPage();
    catalogPage.addToListAnonimProductPage();
  });
});
