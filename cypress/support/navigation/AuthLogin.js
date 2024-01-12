class AuthLogin {

  setDimensions(){
    cy.viewport(Cypress.env('DEVICE_NAME'));
  }
    visitHomePage() {
      cy.visit(Cypress.env('PLATFORM_URL'));

    }

    visitSignUpPage() {
      cy.visit(`${Cypress.env('PLATFORM_URL')}/sign-up`);

    }

    visitSignInPage() {
      cy.visit(`${Cypress.env('PLATFORM_URL')}/sign-in`);

    }
  }

  export default new AuthLogin();
