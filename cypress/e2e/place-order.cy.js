import ProductPage from "../support/page_objects/ProductPage/ProductPage";
import CartPage from "../support/page_objects/CartPage/CartPage";

describe('place order', () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.log('Clearing cookies and local storage');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('proceeds to shipping', () => {
    cy.log('Adding to cart');
    productPage.visit('snacks/chips/lays-chips-paprika-box-20x40gr');
    productPage.purchase();
    cy.wait(2000);
    cartPage.visit();
    cartPage.checkout();

    cy.url().should('include', '/shipping');

    cartPage.visit();
    cartPage.clearCart();
  });
});
