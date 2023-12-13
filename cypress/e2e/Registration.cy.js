import AuthLogin from '../support/navigation/AuthLogin';
import SignUpPage from '../support/page_objects/SignUpPage/SignUpPage';

describe('Successful registration', () => {

  // Initializing Page Objects
  const signUpPage = new SignUpPage();
  

    // This block runs before each test
    beforeEach(() => {
      cy.log('Clearing cookies and local storage'); // Logging
      cy.clearCookies();  // Clear all cookies
      cy.clearLocalStorage();  // Clear local storage
      AuthLogin.setDimensions();      
     
    });


//Main logic
it('Create personal account', ()=> {

  cy.log('Starting registration');

  signUpPage.startFromHome();
  signUpPage.checkLabelsPersonal();
  signUpPage.personalRegistration();

  cy.log('Verifying successful registration');

})

it('Create company account', () => {

  cy.log('Starting registration');

  signUpPage.startFromHome();
  signUpPage.checkLabelsCompany(); 
  signUpPage.companyRegistration();

  cy.log('Verifying successful registration');

})

})