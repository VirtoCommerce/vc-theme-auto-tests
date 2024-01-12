class TestData {
    constructor() {
        this.email = Cypress.env('LOGIN_PERSONAL_EMAIL');
        this.password = Cypress.env('LOGIN_PERSONAL_PASSWORD');
        this.device = Cypress.env('DEVICE_NAME');
    }
}

export default new TestData();
