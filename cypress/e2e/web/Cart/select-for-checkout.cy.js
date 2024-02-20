import CartPage from "../../../support/page_objects/CartPage/CartPage";
import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import SelectForCheckout from "../../../support/page_objects/CheckoutFlow/SelectForCheckout";
import {PersonalCheckout} from "../../../support/page_objects/CheckoutFlow/CheckoutFlow";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import TestData from "../../Variables/TestData";
import LogOut from "../../../support/navigation/LogOut";
import userData from "../../Variables/userData";


const SUBCATEGORY = 'new-home/bedroom-furniture';
const NEWCATEGORY = 'soft-drinks/soda';

describe('Select for checkout', () => {

    const selectForCheckout = new SelectForCheckout();
    const cartPage = new CartPage();
    const catalogPage = new CatalogPage();
    const loginPage = new LoginPage();
    const personalCheckout = new PersonalCheckout();
    const logOut = new LogOut();  
    

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage(); 
        cy.viewport(Cypress.env('DEVICE_NAME'));
        loginPage.login(userData.userData[0].email, userData.userData[0].password);
        cy.get('h2').should('be.visible'); 
        cartPage.emptyOrNot();        

    });         

    it('C378456: add mixed items > unselect physical products > create an order', () => { 

               
    catalogPage.visit(SUBCATEGORY);   
    catalogPage.addToCart();     
    cartPage.visitByCartClick();    
    cy.checkLoading('.vc-loader-overlay__spinner');        
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
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.checkBillingPage();
    personalCheckout.reviewOrder();
    personalCheckout.placeOrder();
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.fillCardForm(TestData.cardNumber, TestData.cvv);
    personalCheckout.pay();    
    personalCheckout.isPayed();
    personalCheckout.checkOrder();

    //check cart after order creation

    cartPage.visitByCartClick();
    cy.intercept('/cart').as('GetFullCart');    
    cartPage.cartLineItemsCheck();    
    selectForCheckout.SelectedState(); 
    cy.digitalProductChipAbsent('.vc-chip__content');

    //Clear cart
    cartPage.clearCart();
    cartPage.confirmClearCart();
    cy.log('The test is comleted');

    //log out
    cy.log('click on the user name and log out')
    logOut.signOut(userData.userData[0].user_name);
    cy.log('Logging out completed')

    });
   

    it('C367728: add mixed items > unselect digital products > create an order', () => {

    catalogPage.visit(SUBCATEGORY);       
    catalogPage.purchaseAll();     
    cartPage.visitByCartClick();    
    cy.checkLoading('.vc-loader-overlay__spinner');
    cy.reload();   
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
    //personalCheckout.addNewShippingAddress();
    personalCheckout.selectShippingAddress();
    personalCheckout.selectDelivery('Fixed Rate (Ground)');
    personalCheckout.leaveComment('place-order.cy test');
    personalCheckout.proceedToBilling();
    personalCheckout.checkBillingPage();
    personalCheckout.selectPaymentMethod('Bank card (Authorize.Net)');
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.checkStepsNumber();
    personalCheckout.reviewOrder();
    personalCheckout.placeOrder();

    cy.checkLoading('.vc-loader-overlay__spinner');

    //Payment page

    personalCheckout.fillCardForm(TestData.cardNumber, TestData.cvv);
    personalCheckout.pay();    
    
    personalCheckout.isPayed();
    personalCheckout.checkOrder();

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
    
    //log out
    cy.log('click on the user name and log out')
    logOut.signOut(userData.userData[0].user_name);
    cy.log('Logging out completed') 

    });
    

it('C367723: select All items > create an order', () => {

        catalogPage.visit(NEWCATEGORY);           
        catalogPage.purchaseAll();     
        cartPage.visitByCartClick();    
        cy.checkLoading('.vc-loader-overlay__spinner');         
        cartPage.cartLineItemsCheck();
        
        selectForCheckout.SelectedState();
    
    //Select for checkout > Mixed order

    cy.checkLoading('.vc-loader-overlay__spinner');
    cartPage.proceedButtonActive();  
    selectForCheckout.totalSubtotal();

    //Checkout
    cartPage.checkout();
    cy.checkLoading('.vc-loader-overlay__spinner');

    personalCheckout.checkShippingPage();    
    personalCheckout.selectShippingAddress();
    personalCheckout.selectDelivery('Fixed Rate (Air)');
    personalCheckout.leaveComment('place-order.cy test');
    personalCheckout.proceedToBilling();
    
    cy.log('Select manual payment')
    personalCheckout.selectPaymentMethod('Manual');
    cy.checkLoading('.vc-loader-overlay__spinner');
    personalCheckout.checkBillingPage();
    personalCheckout.reviewOrder();
    personalCheckout.placeOrder();

    cy.checkLoading('.vc-loader-overlay__spinner');

    //Completed page page

    personalCheckout.checkCompletePage();    

    //check cart after order creation
    cartPage.visitByCartClick();    
    cy.intercept('/cart').as('GetFullCart');
    cartPage.isCleared();    

    cy.log('The test is comleted');
    
    //log out
    cy.log('click on the user name and log out')
    logOut.signOut(userData.userData[0].user_name);
    cy.log('Logging out completed')
 });

});