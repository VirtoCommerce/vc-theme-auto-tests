import CatalogPage from "../support/page_objects/CatalogPage/CatalogPage";
import CartPage from "../support/page_objects/CartPage/CartPage";
import {aliasQuery} from "../utils/graphql-test-utils";
import TestData from "./Variables/TestData";

const FIRST_CATALOG = 'soft-drinks';

describe('Remove many cart items', () => {
  const catalogPage = new CatalogPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage(); 
    cy.viewport(Cypress.env('DEVICE_NAME'));  
    cy.intercept('/xapi/graphql', (req) => {
      aliasQuery(req, 'SearchProducts');
      aliasQuery(req, 'GetFullCart');
    })
  });

  it('removes many items from cart', () => {
    
    catalogPage.visit(FIRST_CATALOG);  
   
    cy.wait('@SearchProductsQuery').then(() => {
      catalogPage.purchaseAll();     
       
   });

cartPage.visitByCartClick();
cy.wait(5000);
cy.intercept('/cart').as('GetFullCart');
cy.get('.vc-loader-overlay').should('not.be.visible');
cy.get('#products').should('be.visible');
cy.scrollTo('bottom');
cy.wait(1000);
cartPage.clearCart();
cartPage.confirmClearCart();
cartPage.isCleared();

  })

})
