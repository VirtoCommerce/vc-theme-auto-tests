import ProductPage from "../support/page_objects/ProductPage/ProductPage";
import CartPage from "../support/page_objects/CartPage/CartPage";
import {AnonymousCheckout, PersonalCheckout} from "../support/page_objects/CheckoutFlow/CheckoutFlow";
import LoginPage from "../support/page_objects/LoginPage/LoginPage";
import TestData from "./Variables/TestData";

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
    cy.interceptAllXapiRequests();
    cy.interceptAllStorefrontRequests();
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
    cy.wait(1000);
    cartPage.visit();
    cy.wait(1000);
    cartPage.clearCart();
    cy.wait(1000);

    productPage.visit('snacks/chips/lays-chips-paprika-box-20x40gr');
    cy.wait(1000);
    productPage.purchase();
    cy.wait(1000);
    cartPage.visit();
    cy.wait(1000);
    cartPage.checkout();
    cy.wait(1000);

    personalCheckout.selectShippingAddress();
    personalCheckout.selectDelivery('Fixed Rate (Ground)');
    personalCheckout.leaveComment('place-order.cy test');
    personalCheckout.proceedToBilling();
  });
});
