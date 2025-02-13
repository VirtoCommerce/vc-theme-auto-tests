import CartPage from '../support/pageObjects/cartPage/cartPage.js';
import LineItem from '../support/pageObjects/cartPage/lineItem/lineItem.js';
import SupplierLineItemsContainer from '../support/pageObjects/cartPage/supplierLineItemsContainer/supplierLineItemsContainer.js';
import CheckoutBillingPage from '../support/pageObjects/checkoutBillingPage/checkoutBillingPage.js';
import CheckoutShippingPage from '../support/pageObjects/checkoutShippingPage/checkoutShippingPage.js';
import Header from '../support/pageObjects/header/header.js';
import OrderCompletedPage from '../support/pageObjects/orderCompletedPage/orderCompletedPage.js';
import ProductCard from '../support/pageObjects/productCard/productCard.js';
import ProductsPage from '../support/pageObjects/productsPage/productsPage.js';
import ReviewOrderPage from '../support/pageObjects/reviewOrderPage/reviewOrderPage.js';
import SearchFieldDropdown from '../support/pageObjects/searchFieldDropdown/searchFieldDropdown.js';
import SuppliersFacet from '../support/pageObjects/suppliersFacet/suppliersFacet.js';
import clearCartIfPresent from '../support/utils/clearCartIfPresent.js';
import SimpleUtils from '../support/utils/simpleUtils.js';


//Clear cart before each test
beforeEach(() => {
  clearCartIfPresent()
})

describe('createOrder_vendorSelected', () => {

//Instantiate page objects
const header = new Header();
const searchFieldDropdown = new SearchFieldDropdown();
const vendorsFacet = new SuppliersFacet();
const productsPage = new ProductsPage();
const productCard = new ProductCard();
const cartPage = new CartPage();
const checkoutShippingPage = new CheckoutShippingPage();
const checkoutBillingPage = new CheckoutBillingPage();
const reviewOrderPage = new ReviewOrderPage();
const orderCompletedPage = new OrderCompletedPage();
const lineItem = new LineItem();
const supplierLineItemsContainer = new SupplierLineItemsContainer();

  it('Select a vendor and create an order', () => {

    //Log in
      SimpleUtils.login()

    //Input product search query and click "View all results" in the dropdown
      header.searchFieldInputText('Tech')
      header.getSearchButton()//just an additional check
      searchFieldDropdown.clickShowAllResultsButton()
      
    //On products page click "View all results"
      productsPage.clickViewAllProductsButton()

    //Select vendor
      const supplierName = 'Pocket Nurse'
      SuppliersFacet.inputTextSuppliersFacetSearchField(supplierName)
      SuppliersFacet.clickFilteredCheckBox(supplierName)

    //Add products to the cart ( specify the index )
      productCard.clickAddToCartOnTheAvailableProduct(0)
      productCard.clickAddToCartOnTheAvailableProduct(1)
      header.getCartContentIndex()
      .should('equal','2')

    //Click cart icon
      header.clickCartIcon()

    //Interact with the cart (but wait for loader to disappear first)
      cy.wait(3000)
      lineItem.changeLineItemQuantity()
      lineItem.validateLineLineItemCheckboxToggle()
      lineItem.removeOneRandomLineItem()
      supplierLineItemsContainer.validateSupplierMainLineItemCheckboxToggle()

    //Click 'Proceed to checkout'
      cartPage.clickProceedToCheckoutButton()

    //Go through checkout process
      checkoutShippingPage.clickSelectDeliveryMethodButton()
      checkoutShippingPage.clickDeliveryMethodOption(0) //receives number (position in the list)
      checkoutShippingPage.clickProceedToCheckoutButton()
      checkoutBillingPage.clickSelectPaymentMethodButton()
      checkoutBillingPage.getSelectPaymentMethodOptions()
      checkoutBillingPage.clickAccountBillingOption()
      checkoutBillingPage.clickReviewOrderButton()

    //Click "Place order" and verify user is on the "Order completed" page
      reviewOrderPage.clickPlaceOrderbutton();
      orderCompletedPage.getOrderCompletedPageTitle();

    //Logout  
   SimpleUtils.logout()

  });


});
