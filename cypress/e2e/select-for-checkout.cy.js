import CartPage from "../support/page_objects/CartPage/CartPage";
import CatalogPage from "../support/page_objects/CatalogPage/CatalogPage";
import SelectForCheckout from "../support/page_objects/CheckoutFlow/SelectForCheckout";
import LoginPage from "../support/page_objects/LoginPage/LoginPage";
import TestData from "./Variables/TestData";
import {aliasQuery} from "../utils/graphql-test-utils";
import {AnonymousCheckout, PersonalCheckout} from "../support/page_objects/CheckoutFlow/CheckoutFlow";

const SUBCATEGORY = 'courses-and-digital-products/digital-products';

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
        //cartPage.emptyOrNot();

    });         

    it.only('Select only digital product', () => { 

               
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
    personalCheckout.addNewBillingAddress();   
    personalCheckout.selectPaymentMethod('Bank card (Authorize.Net)');
    personalCheckout.reviewOrder();
    personalCheckout.placeOrder();
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.fillCardForm(TestData.cardNumber, TestData.cvv);
    personalCheckout.pay();
    personalCheckout.isPayed();

    //check cart after order creation

    cartPage.visitByCartClick();
    cartPage.visitByCartClick();
    cy.intercept('/cart').as('GetFullCart');    
    cartPage.cartLineItemsCheck();    
    selectForCheckout.SelectedState(); 
    cy.digitalProductChipAbsent('.vc-chip__content');

    //Clear cart
    cartPage.clearCart();
    cartPage.confirmClearCart();
    cy.log('The test is comleted');
    });
   

 it('Select only Physical product', () => {

    catalogPage.visit(SUBCATEGORY);
    cy.wait(5000);   
    catalogPage.purchaseAll(); 
    cartPage.visitByCartClick();
    cy.intercept('/cart').as('GetFullCart');    
    cartPage.cartLineItemsCheck();
    
    selectForCheckout.SelectedState();
    
    //Select only Physical product

    selectForCheckout.selectOnlyPysical();
    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.proceedButtonActive();  
    selectForCheckout.totalSubtotal();

    //Checkout
    cartPage.checkout();
    cy.checkLoading('.vc-loader-overlay__spinner');

    personalCheckout.checkShippingPage();
    personalCheckout.addNewShippingAddress();
    personalCheckout.selectDelivery('Fixed Rate (Ground)');
    personalCheckout.leaveComment('place-order.cy test');
    personalCheckout.proceedToBilling();
    personalCheckout.checkBillingPage();
    personalCheckout.selectPaymentMethod('Bank card (Authorize.Net)');
    personalCheckout.reviewOrder();
    personalCheckout.placeOrder();

    cy.checkLoading('.vc-loader-overlay__spinner');

    personalCheckout.fillCardForm(TestData.cardNumber, TestData.cvv);
    personalCheckout.pay();
    personalCheckout.isPayed();

    //check cart after order creation
    cartPage.visitByCartClick();    
    cy.intercept('/cart').as('GetFullCart');    
    cartPage.cartLineItemsCheck();    
    selectForCheckout.SelectedState();
    cy.digitalLabel('.vc-chip__content');

    //Clear cart
    cartPage.clearCart();
    cartPage.confirmClearCart();
    cy.log('The test is comleted');  
    

 });


})