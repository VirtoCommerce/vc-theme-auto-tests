import ProductPage from "../support/page_objects/ProductPage/ProductPage";
import CartPage from "../support/page_objects/CartPage/CartPage";
import {AnonymousCheckout, PersonalCheckout} from "../support/page_objects/CheckoutFlow/CheckoutFlow";
import LoginPage from "../support/page_objects/LoginPage/LoginPage";
import TestData from "./Variables/TestData";
import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils";

const PRODUCT_URL = TestData.defaultProductPage;

describe('place order', () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const anonymousCheckout = new AnonymousCheckout();
  const personalCheckout = new PersonalCheckout();
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.log('Clearing cookies and local storage');
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('/xapi/graphql', (req) => {
      aliasQuery(req, 'GetShortCart');
    });
  });

  it('places order created by Anonymous user', () => {
    productPage.visit(PRODUCT_URL);
    productPage.purchase();
    cy.checkLoading('.vc-button__loader');
    cartPage.visitByCartClick();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.checkout();

    anonymousCheckout.fillShippingAddress();
    anonymousCheckout.selectDelivery('Fixed Rate (Ground)');
    anonymousCheckout.proceedToBilling();
    anonymousCheckout.selectPaymentMethod('Manual');
    anonymousCheckout.reviewOrder();
    anonymousCheckout.placeOrder();

    anonymousCheckout.isCompleted();
  });

  it('places order as Personal user', () => {
    loginPage.login(TestData.email, TestData.password);
    cy.wait('@GetShortCartQuery')
      .wait('@GetShortCartQuery')
      .then((interception) => {
      if(interception.response.body.data.cart.itemsQuantity) {
        cy.log('Clearing cart');
        cartPage.visit();
        cartPage.clearCart();
        cartPage.confirmClearCart();
        cy.checkLoading('.vc-loader-overlay__spinner');
        productPage.visit(PRODUCT_URL);
      } else {
        productPage.visit(PRODUCT_URL);
      }

      cy.wait(500);

      productPage.purchase();

      cy.checkLoading('.vc-button__loader');

      cartPage.visitByCartClick();

      cy.checkLoading('.vc-loader-overlay__spinner');

      cartPage.checkout();

      cy.checkLoading('.vc-loader-overlay__spinner');

      personalCheckout.selectShippingAddress();
      personalCheckout.selectDelivery('Fixed Rate (Ground)');
      personalCheckout.leaveComment('place-order.cy test');
      personalCheckout.proceedToBilling();
      personalCheckout.selectPaymentMethod('Bank card (Authorize.Net)');
      personalCheckout.reviewOrder();
      personalCheckout.placeOrder();

      cy.checkLoading('.vc-loader-overlay__spinner');

      personalCheckout.fillCardForm(Cypress.env('CARD_NUMBER_VISA'), Cypress.env('CVV'));
      personalCheckout.pay();
      personalCheckout.isPayed();
    })
  });
});
