class ProductCard {

isStarGrey(){

cy.get('svg[class="vc-icon w-5 h-5 lg:w-4 lg:h-4 text-[--color-neutral-400]"]')
.eq(0)
.should('have.css', 'color')
.and('eq', 'rgb(163, 163, 163)');
cy.log('The color of star is grey');
            
}

isStarGreyPDP(){

cy.get('button[class="w-full py-4 hover:bg-[--color-neutral-50] disabled:bg-transparent text-[--color-neutral-300]"]')
.should('have.css', 'color')
.and('eq', 'rgb(212, 212, 212)');
cy.log('The color of star is grey');
        
}

isStarOrange(){
    
cy.log('Check the color of a star after adding it to the list')
cy.get('svg[class="vc-icon w-5 h-5 lg:w-4 lg:h-4 text-[--color-primary-500]"]')
.eq(0)
.should('have.css', 'color')
.and('eq', 'rgb(240, 173, 78)');
cy.log('The product was added to the list. The color of star is orange')
        
}
    
isStarOrangePDP(){
    
cy.log('Check the color of a star after adding it to the list')
cy.get('button[class="w-full py-4 hover:bg-[--color-neutral-50] disabled:bg-transparent text-[--color-primary-500]"]')
.should('have.css', 'color')
.and('eq', 'rgb(240, 173, 78)');
 cy.log('The product was added to the list. The color of star is orange')
    
}

}

export default new ProductCard();


