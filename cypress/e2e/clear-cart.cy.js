import TestData from "./Variables/TestData";
import ProductPage from "../support/page_objects/ProductPage/ProductPage";
import CartPage from "../support/page_objects/CartPage/CartPage";

const PRODUCT_URL = TestData.defaultProductPage;

describe('Clear cart', () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Should login and then perform actions', () => {
    productPage.visit(PRODUCT_URL);
    productPage.purchase();
    cy.get('.vc-button__loader', { timeout: 5000 }).should('not.exist');
    cartPage.visitByCartClick();
    cy.get('.vc-loader-overlay__spinner', { timeout: 5000 }).should('not.exist');
    cartPage.clearCart();
    cartPage.confirmClearCart();
    cy.get('.vc-button__loader', { timeout: 5000 }).should('not.exist');
    cartPage.isCleared();
  })

})
