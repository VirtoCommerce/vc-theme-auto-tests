import { CatalogPageLocators } from "./CatalogLocators";

class ProductCard {

isStarGrey(){

cy.get(CatalogPageLocators.INACTIVE_STAR)
.eq(0)
.should('have.class', 'text-neutral-400')
cy.log('The color of star is grey');
            
}

isStarGreyPDP(){

cy.get(CatalogPageLocators.INACTIVE_STAR_PDP)
.should('have.class', 'text-neutral-300')
cy.log('The color of star is grey');
        
}

isStarOrange(){
    
cy.log('Check the color of a star after adding it to the list')
cy.get(CatalogPageLocators.ACTIVE_STAR)
.eq(0)
.should('have.class', 'text-primary');
cy.log('The product was added to the list. The color of star is orange')
        
}
    
isStarOrangePDP(){
    
cy.log('Check the color of a star after adding it to the list')
cy.get(CatalogPageLocators.ACTIVE_STAR_PDP)
.should('have.class', 'text-primary')
 cy.log('The product was added to the list. The color of star is orange')
    
}

}

export default new ProductCard();


