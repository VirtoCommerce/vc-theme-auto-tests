import TestData from "../../Variables/TestData";
import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";
import CartPage from "../../../support/page_objects/CartPage/cartPage";
import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";

const PRODUCT_URL = TestData.defaultProductPage;

describe('Clear cart', () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const catalogPage = new CatalogPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(Cypress.env('DEVICE_NAME'));
  });

  it('Should login and then perform actions', () => {
    
    catalogPage.visit('catalog');
    cartPage.emptyOrNot();
    productPage.visit(PRODUCT_URL);
    catalogPage.AddToCartSingleBtn();
    cartPage.visitByCartClick();

    cy.checkLoading('.vc-button__loader');

    cartPage.visitByCartClick();

    cy.checkLoading('.vc-loader-overlay__spinner');

    cartPage.clearCart();
    cartPage.confirmClearCart();

    cy.checkLoading('.vc-loader-overlay__spinner');

    cartPage.isCleared();
  })

})
