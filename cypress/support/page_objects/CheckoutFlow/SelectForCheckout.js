import {CartPageLocators} from '../../../support/page_objects/CartPage/CartPageLocators/CartPageLocators';


class SelectForCheckout{

    SelectedState(){

       
    cy.get(CartPageLocators.CHECKBOX).first().should('be.checked');
           
          
          }

unselectedState(){

    cy.get(CartPageLocators.CHECKBOX).first().should('not.be.checked');
}

clickAction(){
    cy.get(CartPageLocators.CHECKBOX).first().uncheck();
}
  
}

export default SelectForCheckout;