import AuthLogin from '../support/navigation/AuthLogin';
import SignUpPage from '../support/page_objects/SignUpPage/SignUpPage';
import LoginPage from '../support/page_objects/LoginPage/LoginPage';
import TestData from './Variables/TestData';

describe('Successful registration', () => {

  // Initializing Page Objects
  const signUpPage = new SignUpPage();
  const loginPage = new LoginPage();
  

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

//Login as a personal account
it('Personal: Email verification is mandatory', () => {
  cy.log('Login as a personal account');
  loginPage.checkEmailVerification(TestData.email, TestData.password);
  cy.log('Need to confirm the email');  

})

//Login as a company account
it('Company: Email verification is mandatory', () => {
  cy.log('Login as a company account');
  loginPage.checkEmailVerification(TestData.login_corp_email, TestData.login_corp_password);
  cy.log('Need to confirm the email');  

})

})