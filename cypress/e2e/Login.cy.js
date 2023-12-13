// Importing Page Objects
import LoginPage from '../support/page_objects/LoginPage/LoginPage';
import TestData from './Variables/Test_data';

describe('Login', () => {
  // Initializing Page Objects
  const loginPage = new LoginPage(); 

  // This block runs before each test
  beforeEach(() => {
    cy.log('Clearing cookies and local storage'); // Logging
    cy.clearCookies();  // Clear all cookies
    cy.clearLocalStorage();  // Clear local storage
  });

  // Main Test Scenario
  it('Should login and then perform actions', () => {
    cy.log('Starting Login Phase'); // Logging
    // Login Phase
    loginPage.visit();
    loginPage.fillEmail(TestData.email);
    loginPage.fillPassword(TestData.password);
    loginPage.clickLoginButton();
    loginPage.checkNoErrorMessage();

    cy.log('Verifying successful login'); // Logging
    // Verify successful login
    cy.wait(6000);
    cy.url().should('include', '/catalog')

  })

})
