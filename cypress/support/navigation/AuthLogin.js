class AuthLogin {

  setDimensions(){
    cy.viewport(1024, 700)
  }
    visitHomePage() {
      cy.visit(Cypress.env('baseUrl'));
     
    }

    visitSignUpPage() {
      cy.visit(Cypress.env('baseUrl'));
     
    }

    visitSignInPage() {
      cy.visit(Cypress.env('baseUrl'));
      
    }
  }
  
  export default new AuthLogin();
  