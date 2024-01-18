class TestData {
    constructor() {
        this.email = Cypress.env('LOGIN_PERSONAL_EMAIL');
        this.password = Cypress.env('LOGIN_PERSONAL_PASSWORD');
        this.device = Cypress.env('DEVICE_NAME');
        this.defaultProductPage = '/televisions/lg/lg-eg9600-series-65-class-4k-smart-curved-ole';
        this.cardNumber = Cypress.env('CARD_NUMBER_VISA');
        this.cvv = Cypress.env('CVV');
    }
}

export default new TestData();
