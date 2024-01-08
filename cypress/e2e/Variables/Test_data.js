class TestData {
    constructor() {
        this.email = Cypress.env('LOGIN_PERSONAL_EMAIL');
        this.password = Cypress.env('LOGIN_PERSONAL_PASSWORD');
        this.corpEmail =  Cypress.env('LOGIN_CORP_EMAIL');
        this.corpPassword = Cypress.env('LOGIN_CORP_PASSWORD');    

    }
 
}

export default new TestData();
