class AuthLogin {

  setDimensions(){
    cy.viewport(1024, 700)
  }
    visitHomePage() {
      cy.visit('https://vcst-qa-storefront.paas.govirto.com');
     
    }

    visitSignUpPage() {
      cy.visit('https://vcst-qa-storefront.paas.govirto.com/sign-up');
     
    }

    visitSignInPage() {
      cy.visit('https://vcst-qa-storefront.paas.govirto.com/sign-in');
      
    }
  }
  
  export default new AuthLogin();
  