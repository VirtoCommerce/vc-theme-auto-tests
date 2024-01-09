import LoginPage from '../support/page_objects/LoginPage/LoginPage';

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
    loginPage.login();
    // Verify successful login
    cy.wait(2000);
    cy.url().should('include', '/catalog')

  })

})
