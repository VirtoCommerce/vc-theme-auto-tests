class TestData {
    constructor() {
        this.email = Cypress.env('LOGIN_PERSONAL_EMAIL');
        this.password = Cypress.env('LOGIN_PERSONAL_PASSWORD');
    }
}

export default new TestData();
