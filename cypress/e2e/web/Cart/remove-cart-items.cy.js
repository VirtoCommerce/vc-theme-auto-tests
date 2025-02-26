import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import {aliasQuery} from "../../../utils/graphql-test-utils";
import TestData from "../../Variables/TestData";
import AuthLogin from "../../../support/navigation/AuthLogin";
import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";


const CATEGORY = 'soft-drinks/soda';

describe('Remove many cart items', () => {
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();
  const productPage = new ProductPage();

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

  productPage.visit(CATEGORY);
  catalogPage.addToCartOne(1);
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
