import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";
import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import SelectForCheckout from "../../../support/page_objects/CheckoutFlow/SelectForCheckout";
import {AnonymousCheckout, PersonalCheckout} from "../../../support/page_objects/CheckoutFlow/CheckoutFlow";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import Addresses from "../../../support/page_objects/Account/Addresses/Addresses";
import userData from "../../Variables/userData";
import AuthLogin from "../../../support/navigation/AuthLogin";


describe('place order', () => {
  const productPage = new ProductPage();
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();
  const selectForCheckout = new SelectForCheckout();
  const anonymousCheckout = new AnonymousCheckout();
  const personalCheckout = new PersonalCheckout();
  const loginPage = new LoginPage();
  const addresses = new Addresses();


  beforeEach(() => {
    cy.log('Clearing cookies and local storage');
    cy.clearCookies();
    cy.clearLocalStorage();
    AuthLogin.setDimensions();

  });

  it('places order created by Anonymous user', () => {

    productPage.visit('printers');      
    catalogPage.addToCart(3);
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
    anonymousCheckout.isCompleted();

  });

  it('places order as Personal user', () => {

    loginPage.login(userData.userData[0].email, userData.userData[0].password);
    cartPage.emptyOrNot();
    addresses.emtyOrNot();    
    productPage.visit('printers');
    catalogPage.addToCart(3);
    cy.checkLoading('.vc-button__loader');
    cartPage.visitByCartClick();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.checkout();
    cy.checkLoading('.vc-loader-overlay__spinner');
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
      personalCheckout.checkPaymentPage();      
      personalCheckout.fillCardForm(Cypress.env('CARD_NUMBER_VISA'), Cypress.env('CVV'));
      personalCheckout.pay();
      personalCheckout.isPayed();
    })

  afterEach(() => {
    // Check cart after order creation
    cartPage.visitByCartClick();
    cy.intercept('/cart').as('GetFullCart');
    cartPage.isCleared();

  });
});
