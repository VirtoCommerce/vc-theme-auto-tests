class TestData {
    constructor() {
        
        this.defaultProductPage = 'soft-drinks/mineral-water/borjomi-mineral-water-the-essence-of-georgian-volcanic-springs';
        this.cardNumber = Cypress.env('CARD_NUMBER_VISA');
        this.cvv = Cypress.env('CVV');
        this.defaultCatalogUrl = 'printers';
        this.username = Cypress.env('ADMIN_NAME');
        this.password= Cypress.env('ADMIN_PASSWORD');
        this.adminToken = Cypress.env('ADMIN_TOKEN');
    }
}

export default new TestData();
