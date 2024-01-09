class AuthLogin {

  setDimensions(){
    cy.viewport(1024, 700)
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
