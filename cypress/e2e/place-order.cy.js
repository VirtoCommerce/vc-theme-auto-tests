import ProductPage from "../support/page_objects/ProductPage/ProductPage";
import CartPage from "../support/page_objects/CartPage/CartPage";
import {AnonymousCheckout} from "../support/page_objects/CheckoutFlow/CheckoutFlow";

describe('place order', () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const checkoutFlow = new AnonymousCheckout()

  beforeEach(() => {
    cy.log('Clearing cookies and local storage');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('proceeds to shipping', () => {
    cy.log('Adding to cart');
    productPage.visit('snacks/chips/lays-chips-paprika-box-20x40gr');
    productPage.purchase();
    cy.wait(1000);
    cartPage.visit();
    cartPage.checkout();

    checkoutFlow.fillShippingAddress();
    checkoutFlow.selectDelivery('Fixed Rate (Ground)');
    checkoutFlow.proceedToBilling();
    checkoutFlow.selectPaymentMethod('Manual');
    checkoutFlow.reviewOrder();
    checkoutFlow.placeOrder();

    checkoutFlow.isCompleted();
  });
});
