import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";
import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import SelectForCheckout from "../../../support/page_objects/CheckoutFlow/SelectForCheckout";
import {AnonymousCheckout, PersonalCheckout} from "../../../support/page_objects/CheckoutFlow/CheckoutFlow";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import TestData from "../../Variables/TestData";
import {aliasQuery, aliasMutation} from "../../../utils/graphql-test-utils";
import userData from "../../Variables/userData";

const PRODUCT_URL = TestData.defaultProductPage;

describe('place order', () => {
  const productPage = new ProductPage();
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();
  const selectForCheckout = new SelectForCheckout();
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
    });
  });

  it('places order created by Anonymous user', () => {
    productPage.visit(PRODUCT_URL);
    catalogPage.addToCart();
    cartPage.visitByCartClick();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.cartLineItemsCheck();
    selectForCheckout.SelectedState();
    cartPage.proceedButtonActive();
    cartPage.checkout();
    cy.checkLoading('.vc-loader-overlay__spinner');
    anonymousCheckout.checkShippingPage();

    anonymousCheckout.fillShippingAddress();
    anonymousCheckout.selectDelivery('Fixed Rate (Ground)');
    cy.checkLoading('.vc-loader-overlay__spinner');

    anonymousCheckout.proceedToBilling();


    anonymousCheckout.selectPaymentMethod('Manual');
    cy.checkLoading('.vc-loader-overlay__spinner');
    anonymousCheckout.reviewOrder();

    anonymousCheckout.placeOrder();
    cy.checkLoading('.vc-loader-overlay__spinner');
    anonymousCheckout.isCompleted();
  });

  it('places order as Personal user', () => {

    loginPage.login(userData.userData[0].email, userData.userData[0].password);

    cartPage.emptyOrNot();

    productPage.visit(PRODUCT_URL);

    cy.wait(500);

    productPage.purchase();

    cy.checkLoading('.vc-button__loader');

    cartPage.visitByCartClick();

    cy.checkLoading('.vc-loader-overlay__spinner');

    cartPage.checkout();

    cy.checkLoading('.vc-loader-overlay__spinner');

    cy.wait(500);

    personalCheckout.addNewShippingAddress();
    personalCheckout.selectDelivery('Fixed Rate (Ground)');
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.leaveComment('place-order.cy test');
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.proceedToBilling();

    personalCheckout.selectPaymentMethod('Bank card (Authorize.Net)');
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.reviewOrder();
    personalCheckout.placeOrder();

    personalCheckout.fillCardForm(Cypress.env('CARD_NUMBER_VISA'), Cypress.env('CVV'));
    personalCheckout.pay();
    personalCheckout.isPayed();
  })
})
