import CartPage from "../support/page_objects/CartPage/CartPage";
import CatalogPage from "../support/page_objects/CatalogPage/CatalogPage";
import SelectForCheckout from "../support/page_objects/CheckoutFlow/SelectForCheckout";
import LoginPage from "../support/page_objects/LoginPage/LoginPage";
import TestData from "./Variables/TestData";
import {aliasQuery} from "../utils/graphql-test-utils";
import CartPageLocators from "../support/page_objects/CartPage/CartPageLocators/CartPageLocators";

const SUBCATEGORY = 'new-home/bedroom-furniture';

describe('Select for checkout', () => {

    const selectForCheckout = new SelectForCheckout();
    const cartPage = new CartPage();
    const catalogPage = new CatalogPage();
    const loginPage = new LoginPage();
    

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage(); 
        cy.viewport(Cypress.env('DEVICE_NAME'));
        loginPage.login(TestData.email, TestData.password);
         
       
      

      
    });         

    it('Select only digital product', () => { 


    cartPage.emptyOrNot(); 
            
    catalogPage.visit(SUBCATEGORY);
    cy.wait(5000);   
    catalogPage.purchaseAll(); 
    cartPage.visitByCartClick();
    cy.intercept('/cart').as('GetFullCart');    
    cartPage.cartLineItemsCheck();
    
    selectForCheckout.SelectedState();   
    selectForCheckout.uncheckAll();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.proceedButtonInactive();
    selectForCheckout.totalSubtotalAfterUncheckALL();       
    selectForCheckout.unselectedState();

    selectForCheckout.selectOnlyDigital();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.proceedButtonActive();  
    selectForCheckout.totalSubtotal(); 
    
    //Checkout
    cartPage.checkout();
       
   
    })


})