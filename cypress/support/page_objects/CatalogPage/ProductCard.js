class ProductCard {

isStarGrey(){

cy.get('.flex > .vc-icon > use')
.eq(5)
.should('have.css', 'color')
.and('eq', 'rgb(163, 163, 163)');
cy.log('The color of star is grey');
    
}
    
isStarOrange(){
    
cy.log('Check the color of a star after adding it to the list')
cy.get('.flex > .vc-icon > use')
.eq(5)
.should('have.css', 'color')
.and('eq', 'rgb(240, 173, 78)');
 cy.log('The product was added to the list. The color of star is orange')
    
}

}

export default new ProductCard();


