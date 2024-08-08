import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import {aliasQuery} from "../../../utils/graphql-test-utils";
import TestData from "../../Variables/TestData";
import SelectForCheckout from "../../../support/page_objects/CheckoutFlow/SelectForCheckout";

describe('Remove many cart items', () => {
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();
  const selectForCheckout = new SelectForCheckout();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(Cypress.env('DEVICE_NAME'));
    cy.intercept('/xapi/graphql', (req) => {
      aliasQuery(req, 'SearchProducts');
      aliasQuery(req, 'GetFullCart');
    })
  });

  it('removes many items from cart', () => {

    catalogPage.visit(TestData.defaultCatalogUrl);

    catalogPage.purchaseAll(3);
    cartPage.visitByCartClick();

cy.wait(1000);
cy.intercept('/cart').as('GetFullCart');
cy.checkLoading('.vc-loader-overlay__spinner');
cy.wait(1000);
cy.get('.vc-line-items').should('exist');
    selectForCheckout.uncheckAll();

cy.scrollTo('bottom');
cartPage.clearCart();
cartPage.confirmClearCart();
cartPage.isCleared();

  })

})
