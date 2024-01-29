import AuthLogin from '../../../support/navigation/AuthLogin';
import { LoginPageLocators } from './LoginPageLocators/LoginPageLocators';
import TestData from '../../../e2e/Variables/TestData';

// Class for handling operations related to the Login Page
class LoginPage {
  // Navigate to the Login Page
  visit() {
    AuthLogin.visitSignInPage();
    cy.log('Step: Visited Login Page'); // Logging
  }

  // Fill the Email input field
  fillEmail(email) {
    cy.log('Step: Filling the Email field'); // Logging
    cy.get(LoginPageLocators.EMAIL_INPUT)
      .should('be.visible')  // Assertion: Check if visible
      .should('be.empty')    // Assertion: Check if empty
      .type(email)           // Type the email
      .should('have.value', email);  // Assertion: Check if value is as expected

    cy.log(`Completed: Filled email field with ${email}`); // Logging
  }

  // Fill the Password input field
  fillPassword(password) {
    cy.log('Step: Filling the Password field'); // Logging
    cy.get(LoginPageLocators.PASSWORD_INPUT)
      .should('be.visible')  // Assertion: Check if visible
      .should('be.empty')    // Assertion: Check if empty
      .type(password)        // Type the password
      .should('have.value', password);  // Assertion: Check if value is as expected

    cy.log(`Completed: Filled password field with ${password}`); // Logging
  }

  // Click the Login Button
  clickLoginButton() {
    cy.log('Step: Clicking the Login Button'); // Logging
    cy.xpath(LoginPageLocators.LOGIN_BUTTON)
      .should('be.visible')  // Assertion: Check if visible
      .should('be.enabled')  // Assertion: Check if enabled
      .click();              // Click the button

    cy.log(`Completed: Clicked on Login Button with XPath ${LoginPageLocators.LOGIN_BUTTON}`); // Logging
  }

  // Check if there are no error messages displayed
  checkNoErrorMessage() {
    cy.log('Step: Checking for the absence of error messages'); // Logging
    cy.document().then((doc) => {
      const errorElement = doc.evaluate(
        LoginPageLocators.ERROR_MESSAGE,
        doc,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (errorElement) {
        // Assertion: If the element is found, check its content
        expect(errorElement.textContent).to.not.contain("Login attempt failed. Please check your credentials");
        cy.log('Completed: Found error message element but it does not contain invalid login text'); // Logging
      } else {
        // If the element is not found, proceed
        cy.log('Completed: No error message element found, which is expected.'); // Logging
      }
    });
  }

  login(email, password) {
    cy.log('Starting Login Phase');
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLoginButton();
    cy.checkLoading('.vc-button__loader');
    this.checkNoErrorMessage();
    cy.log('Verifying successful login');
    cy.url().should('include', '/catalog');
  }


  checkEmailVerification(email, password) {
    cy.log('Starting Login Phase');
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLoginButton();
    cy.checkLoading('.vc-button__loader');
    cy.get('.vc-alert').contains('Email verification required. Please verify your email address');
    cy.log('Verifying email confirmation is required')
  }
    


}

export default LoginPage;
