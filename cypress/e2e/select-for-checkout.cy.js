import CartPage from "../support/page_objects/CartPage/CartPage";
import CatalogPage from "../support/page_objects/CatalogPage/CatalogPage";
import SelectForCheckout from "../support/page_objects/CheckoutFlow/SelectForCheckout";
import LoginPage from "../support/page_objects/LoginPage/LoginPage";
import TestData from "./Variables/TestData";
import {aliasQuery} from "../utils/graphql-test-utils";
import {AnonymousCheckout, PersonalCheckout} from "../support/page_objects/CheckoutFlow/CheckoutFlow";

const SUBCATEGORY = 'new-home/bedroom-furniture';

describe('Select for checkout', () => {

    const selectForCheckout = new SelectForCheckout();
    const cartPage = new CartPage();
    const catalogPage = new CatalogPage();
    const loginPage = new LoginPage();
    const personalCheckout = new PersonalCheckout();    
    

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage(); 
        cy.viewport(Cypress.env('DEVICE_NAME'));
        loginPage.login(TestData.email, TestData.password);
        cartPage.emptyOrNot();
         
       
      

      
    });         

    it('Select only digital product', () => { 

               
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

    //Select only digital product
    selectForCheckout.selectOnlyDigital();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.proceedButtonActive();  
    selectForCheckout.totalSubtotal(); 
    
    //Checkout
    cartPage.checkout();
    cy.checkLoading('.vc-loader-overlay__spinner');
    selectForCheckout.checkoutForDigitalProduct();
    personalCheckout.addNewAddress();   
    personalCheckout.selectPaymentMethod('Bank card (Authorize.Net)');
    personalCheckout.reviewOrder();
    personalCheckout.placeOrder();
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.fillCardForm(TestData.cardNumber, TestData.cvv);
    personalCheckout.pay();
    personalCheckout.isPayed(); 


       
   
    })


})