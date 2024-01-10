import ProductPage from "../support/page_objects/ProductPage/ProductPage";
import CartPage from "../support/page_objects/CartPage/CartPage";
import {AnonymousCheckout, PersonalCheckout} from "../support/page_objects/CheckoutFlow/CheckoutFlow";
import LoginPage from "../support/page_objects/LoginPage/LoginPage";
import TestData from "./Variables/TestData";
import {aliasQuery} from "../utils/graphql-test-utils";

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
      // Queries
      aliasQuery(req, 'GetShortCart');
      aliasQuery(req, 'GetMyAddresses');
    })

    cy.intercept({ url: '/storefrontapi/account/login' }).as('storefrontLogin');
    cy.intercept({ url: '/storefrontapi/theme/context' }).as('storefrontContext');
  });

  /* it('places order created by Anonymous user', () => {
    cy.log('Adding to cart');
    productPage.visit('snacks/chips/lays-chips-paprika-box-20x40gr');
    productPage.purchase();
    cy.wait(1000);
    cartPage.visit();
    cartPage.checkout();

    anonymousCheckout.fillShippingAddress();
    anonymousCheckout.selectDelivery('Fixed Rate (Ground)');
    anonymousCheckout.proceedToBilling();
    anonymousCheckout.selectPaymentMethod('Manual');
    anonymousCheckout.reviewOrder();
    anonymousCheckout.placeOrder();

    anonymousCheckout.isCompleted();
  }); */

  it('places order as Personal user', () => {
    loginPage.login(TestData.email, TestData.password);
    cy.wait('@storefrontLogin').then(() => {
      cy.url().should('include', '/catalog').wait('@GetShortCartQuery').then(() => {
        cy.wait(3000);
        cy.get('a[href="/cart"]').then(($a) => {
          if($a.find('.vc-badge__content').length) {
            cy.log('Clearing cart');
            cartPage.visit();
            cartPage.clearCart();
          }

          productPage.visit('snacks/chips/lays-chips-paprika-box-20x40gr');
          cy.wait(1000);
          productPage.purchase();
          cy.wait(1000);
          cartPage.visit();
          cy.wait(1000);
          cartPage.checkout();
          cy.wait('@GetMyAddressesQuery').then(() => {
            personalCheckout.selectShippingAddress();
            personalCheckout.selectDelivery('Fixed Rate (Ground)');
            personalCheckout.leaveComment('place-order.cy test');
            personalCheckout.proceedToBilling();
          })
        })
      });
    })
  });
});
