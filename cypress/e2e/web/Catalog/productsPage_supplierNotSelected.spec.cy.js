import Header from '../support/pageObjects/header/header.js';
import LoginPage from '../support/pageObjects/loginPage/loginPage.js';
import ProductCard from '../support/pageObjects/productCard/productCard.js';
import ProductsPage from '../support/pageObjects/productsPage/productsPage.js';
import SearchFieldDropdown from '../support/pageObjects/searchFieldDropdown/searchFieldDropdown.js';
import SimpleUtils from '../support/utils/simpleUtils.js';

describe('productsPage_supplierNotSelected', () => {

//Instantiate page objects
const loginPage = new LoginPage();
const header = new Header();
const searchFieldDropdown = new SearchFieldDropdown();
const productsPage = new ProductsPage();
const productCard = new ProductCard();

  it('Go to the product page with no supplier selected', () => {

    //Log in
      SimpleUtils.login()

    //Input product search query and click "View all results" in the dropdown
      header.searchFieldInputText('Tech')
      header.getSearchButton()//just an additional check
      searchFieldDropdown.clickShowAllResultsButton()
      
    //On products page click "View all results"
      productsPage.clickViewAllProductsButton()
    
    //No prices should be available when supplier is nor selected
      productCard.getPriceDisplay()
      .should('not.exist')
      productCard.verifyPriceAlertMessage()

    //"Add to cart" buttons should be active for all displayed products
      productCard.verifyAddToCartButtonIsActive()

  });

});
