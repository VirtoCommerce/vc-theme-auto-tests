import CatalogPage from "../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../support/page_objects/CartPage/CartPage";
import {aliasQuery} from "../utils/graphql-test-utils";

const FIRST_CATALOG = 'soft-drinks';

describe('Remove many cart items', () => {
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('/xapi/graphql', (req) => {
      aliasQuery(req, 'SearchProducts');
      aliasQuery(req, 'GetFullCart');
    })
  });

  it('removes many items from cart', () => {
    catalogPage.visit(FIRST_CATALOG);
    cy.wait(1000);
    cy.wait('@SearchProductsQuery').then(() => {
      catalogPage.purchaseAll();
      cartPage.visitByCartClick();
    });

    cy.wait(1000);

    cy.wait('@GetFullCartQuery').then(() => {
      cartPage.clearCart();
      cartPage.isCleared();
    });
  })

})
