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
    cy.viewport(Cypress.env('DEVICE_NAME'));

    cy.intercept('/xapi/graphql', (req) => {
      aliasQuery(req, 'GetShortCart');
      aliasQuery(req, 'GetMyAddresses');
      aliasQuery(req, 'GetMe');
      aliasQuery(req, 'GetShortCart');
      aliasQuery(req, 'GetProduct');
      aliasQuery(req, 'GetFullCart');

      aliasMutation(req, 'ClearCart');
      aliasMutation(req, 'AddItem');
      aliasMutation(req, 'InitializePayment');
    });

    cy.intercept({ url: '/storefrontapi/account/login' }).as('storefrontLogin');
  });

  it('places order created by Anonymous user', () => {
    productPage.visit(PRODUCT_URL);

    cy.wait(500);

    cy.wait('@GetProductQuery').then(productPage.purchase);
    cy.wait('@AddItemMutation').then(cartPage.visitByCartClick);
    cy.wait('@GetFullCartQuery').then(cartPage.checkout);

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
    cy.wait('@storefrontLogin')
      .wait('@GetMeQuery')
      .wait('@GetShortCartQuery')
      .wait('@GetShortCartQuery')
      .then((interception) => {
      if(interception.response.body.data.cart.itemsQuantity) {
        cy.log('Clearing cart');
        cartPage.visit();
        cartPage.clearCart();
        cartPage.confirmClearCart();
        cy.wait('@ClearCartMutation').then(() => {
          productPage.visit(PRODUCT_URL);
        })
      } else {
        productPage.visit(PRODUCT_URL);
      }

      cy.wait(500);

      cy.wait('@GetProductQuery').then(productPage.purchase);
      cy.wait('@AddItemMutation').then(cartPage.visit);
      cy.wait('@GetFullCartQuery').then(cartPage.checkout);

      cy.wait('@GetMyAddressesQuery').then(() => {
        personalCheckout.selectShippingAddress();
        personalCheckout.selectDelivery('Fixed Rate (Ground)');
        personalCheckout.leaveComment('place-order.cy test');
        personalCheckout.proceedToBilling();
        personalCheckout.selectPaymentMethod('Bank card (Authorize.Net)');
        personalCheckout.reviewOrder();
        personalCheckout.placeOrder();
      })

      cy.wait('@InitializePaymentMutation').then(() => {
        personalCheckout.fillCardForm(Cypress.env('CARD_NUMBER_VISA'), Cypress.env('CVV'));
        personalCheckout.pay();
        personalCheckout.isPayed();
      })
    })
  });
});
