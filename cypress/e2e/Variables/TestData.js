class TestData {
    constructor() {
        this.device = Cypress.env('DEVICE_NAME');
        this.defaultProductPage = 'printers/inkjet-printers/inkjet-colorEN/epson-expression-premium-xp-820-wireless-color-photo-printercopierscannerfax-machine-color-black';
        this.cardNumber = Cypress.env('CARD_NUMBER_VISA');
        this.cvv = Cypress.env('CVV');
        this.defaultCatalogUrl = 'printers';
    }
}

export default new TestData();
