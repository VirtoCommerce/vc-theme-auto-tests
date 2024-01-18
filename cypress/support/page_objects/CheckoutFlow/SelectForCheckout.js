import {CartPageLocators} from '../../../support/page_objects/CartPage/CartPageLocators/CartPageLocators';
import 'cypress-real-events/support';


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

selectOnlyDigital(){  

cy.get('.vc-line-item__main').should('be.visible');  

    cy.log('Find and select the element with class .vc-line-item__main and chip "Digital product')
    cy.get('.vc-line-item__main').each(($mainElement) => {
      // Check if the current element contains the chip with text "Digital product"
      if ($mainElement.find('.vc-chip__content:contains("Digital product")').length > 0) {
      
        cy.wrap($mainElement)
          .find('input[type="checkbox"]')
          .click();
  }
})
  
    
cy.log('Assert that the checkbox is checked')
cy.get('.vc-line-item__main').each(($mainElement) => {
    // Check if the current element contains the chip with text "Digital product"
    if ($mainElement.find('.vc-chip__content:contains("Digital product")').length > 0) {     
      cy.wrap($mainElement)
        .find('input[type="checkbox"]')
        .should('be.checked');
}
})
  
   
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

totalSubtotal(){

    cy.log('check section subTotal') 
    cy.get('.vc-line-items__subtotal-sum').should('not.contain.text', '0.00');
 
    cy.log('check Order Summary') 
    cy.get('.mb-4 > :nth-child(2) > span').should('not.contain.text', '0.00');
 
    //check Order summary > Total
    cy.get('.text-green-700 > span').should('not.contain.text', '0.00');
  
 
 
 }


  
}

export default SelectForCheckout;