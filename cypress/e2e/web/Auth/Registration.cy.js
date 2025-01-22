import AuthLogin from "../../../support/navigation/AuthLogin";
import SignUpPage from "../../../support/page_objects/SignUpPage/SignUpPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";
import DeleteData from "../../../support/page_objects/Platform/Delete data";
import Platform from "../../../support/page_objects/Platform/PlatformLogin";



describe('Delete personal and company account from admin site', () => {

  // Initializing Page Objects

  const deleteData = new DeleteData();
  const platform = new Platform();


  // This block runs before each test
  beforeEach(() => {
    cy.log('Logging to platform. Get admin token');
    AuthLogin.setDimensions();
    platform.loginPlatform();
    platform.getAdminToken();

  });

  it('delete personal user account and Contact', () => {

    const token = Cypress.env('ADMIN_TOKEN');
    cy.log('Starting deletion of the user');
    deleteData.deleteUsers(userData.userData[0].email, token);
    cy.log('Deleting  ContactId for the user');
    deleteData.deleteContact(token);

  })

  it('delete company user account and Contact', () => {

    const token = Cypress.env('ADMIN_TOKEN');
    platform.getContactId(userData.userData[1].user_name, token);
    cy.log('Deleting ContactId for the user');
    deleteData.deleteUsers(userData.userData[1].email, token);
    deleteData.deleteContact(token);
    platform.getOrganizationtId(userData.userData[1].company_name, token);
    cy.log('Deleting OrganizationId for the user');
    deleteData.deleteOrganization(token);

  })


});

describe('Successful registration', () => {

  // Initializing Page Objects
  const signUpPage = new SignUpPage();
  const loginPage = new LoginPage();
  const platform = new Platform();


  // This block runs before each test
  beforeEach(() => {
    cy.log('Clearing cookies and local storage');
    cy.clearCookies();
    cy.clearLocalStorage();
    AuthLogin.setDimensions();

  });


  //Main logic
  it('Create personal account', () => {

    cy.log('Starting registration');

    signUpPage.startFromHome();
    signUpPage.checkLabels();
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
    loginPage.checkEmailVerification(userData.userData[0].email, userData.userData[0].password);
    cy.log('Need to confirm the email');

  })

  //Login as a company account
  it('Company: Email verification is mandatory', () => {
    cy.log('Login as a company account');
    loginPage.checkEmailVerification(userData.userData[1].email, userData.userData[1].password);
    cy.log('Need to confirm the email');

  })

})