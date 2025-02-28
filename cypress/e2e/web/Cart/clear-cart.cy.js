import CartPage from "../../../support/page_objects/CartPage/CartPage";
import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import AuthLogin from "../../../support/navigation/AuthLogin";

const PRODUCT_URL = 'printers';

describe('Clear cart', () => {
  
  const cartPage = new CartPage();
  const catalogPage = new CatalogPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    AuthLogin.setDimensions();
  });

  it('Should login and then perform actions', () => {
    
    catalogPage.visit(PRODUCT_URL);
    catalogPage.addToCart(1);
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
