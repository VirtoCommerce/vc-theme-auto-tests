import AuthLogin from "../../../support/navigation/AuthLogin";
import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../../../support/page_objects/CartPage/CartPage";
import ProductPage from "../../../support/page_objects/ProductPage/ProductPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";

describe('Cart Operations', () => {
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();
  const productPage = new ProductPage();
  const loginPage = new LoginPage();
  const CATALOG = 'jewelry-and-gems';
  const PRODUCT = 'snacks';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    AuthLogin.setDimensions();
    loginPage.login(userData.userData[1].email, userData.userData[1].password);
    cartPage.emptyOrNot();   
  });

  it.skip('should handle cart operations and validate totals', () => {
    // Add products to cart from catalog
    catalogPage.visit(CATALOG);
    cy.get('div[search-params]').should('be.visible');    
 
    catalogPage.scrollUntilFindAddToCart(10, 3);     
    cartPage.visitByCartClick();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.cartLineItemsCheck();    

    // Go to cart and verify products
    cartPage.visitByCartClick();
    cartPage.cartLineItemsCheck();

    // Update quantity for first product
    cartPage.updateQuantity(0, 4);
    cy.wait(1000);
    cartPage.validateCartTotals();

    // Update quantity for second product
    cartPage.updateQuantity(1, 2);
    cy.wait(1000); 
    cartPage.validateCartTotals();

    // Remove first product
    cartPage.removeProduct(0);
    cy.wait(1000);
    cartPage.validateCartTotals();    

    // Remove second product
    cartPage.removeProduct(1);       
    cy.wait(1000);

  
  });

  it.skip('should add product from PDP and manage cart', () => {
    // Add product from product detail page
    productPage.visit(PRODUCT);    
    productPage.openProductPage();
    productPage.checkProductPage();
    catalogPage.addToCart(1);
    
    // Verify cart
    cartPage.visitByCartClick();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.cartLineItemsCheck();    
    
    // Update quantity
    cartPage.getItemPrice();
    cartPage.updateQuantity(1, 4);
    cy.wait(1000);    
    cartPage.validateCartTotals();
    
    // Clear cart
    cartPage.clearCart();
    cartPage.confirmClearCart();
    cartPage.isCleared();
  });
  
});



