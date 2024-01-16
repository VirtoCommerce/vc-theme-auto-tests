import {CartPageLocators} from '../../../support/page_objects/CartPage/CartPageLocators/CartPageLocators';


class SelectForCheckout{

    SelectedState(){

cy.get(CartPageLocators.CHECKBOX).should('be.checked');

           
          
 }

unselectedState(){
   
    cy.get(CartPageLocators.CHECKBOX).should('not.be.checked');
}

uncheckAll(){

cy.get(CartPageLocators.CHECKBOX).first().uncheck();

}

checkAllAction(){

cy.get(CartPageLocators.CHECKBOX).first().check();
  
    
}

checkOne(){

    cy.get(CartPageLocators.CHECKBOX).last().check();
}



totalSubtotalAfterUncheckALL(){

   //check section subTotal

    cy.get('.vc-line-items__subtotal').contains('0.00');

    //check Order Summary > Subtotal

    cy.get('.mb-4 > :nth-child(2) > span').contains('0.00');

    //check Order summary > Total
    cy.get('.text-green-700 > span').contains('0.00');

    //check discount

    cy.get('.border-y > :nth-child(1) > :nth-child(2) > span').contains('0.00');


}


  
}

export default SelectForCheckout;