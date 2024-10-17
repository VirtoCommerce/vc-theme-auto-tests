import { CatalogPageLocators } from "./CatalogLocators";

class ProductCard {

isInactive(){

cy.get(CatalogPageLocators.INACTIVE_HEART)
.eq(0)
.should('have.class', '--color-neutral-400')
cy.log('The product was not added to the list');
            
}


isActive(){
    
cy.log('Check the color of a star after adding it to the list')
cy.get(CatalogPageLocators.ACTIVE_HEART)
.eq(0)
.should('have.class', '--color-danger-500');
cy.log('The product was added to the list')
        
}

}

export default new ProductCard();


