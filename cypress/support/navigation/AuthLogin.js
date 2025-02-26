class AuthLogin {

  setDimensions(){
    cy.viewport(1536, 960);
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
