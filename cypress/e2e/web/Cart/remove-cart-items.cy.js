import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../../../support/page_objects/CartPage/cartPage";
import {aliasQuery} from "../../../utils/graphql-test-utils";
import TestData from "../../Variables/TestData";
import AuthLogin from "../../../support/navigation/AuthLogin";

const PRODUCT_URL = 'soft-drinks/mineral-water/borjomi-mineral-water-the-essence-of-georgian-volcanic-springs';

describe('Remove many cart items', () => {
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    AuthLogin.setDimensions();
    cy.intercept('/xapi/graphql', (req) => {
      aliasQuery(req, 'SearchProducts');
      aliasQuery(req, 'GetFullCart');
    })
  });

  it('removes many items from cart', () => {

    catalogPage.visit('soft-drinks/mineral-water');

    catalogPage.addToCartOne(5);
    cartPage.visitByCartClick();

cy.wait(1000);
cy.intercept('/cart').as('GetFullCart');
cy.checkLoading('.vc-loader-overlay__spinner');
cy.wait(1000);
cy.get('.vc-line-items').should('exist');

cy.scrollTo('bottom');
cartPage.clearCart();
cartPage.confirmClearCart();
cartPage.isCleared();

  })

})
