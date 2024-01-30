import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import TestData from "../../Variables/TestData";
import LogOut from "../../../support/navigation/LogOut";

describe('Login and Logout', ()=> {

const loginPage = new LoginPage();
const logOut = new LogOut(); 
    
    
// This block runs before each test
beforeEach(() => {
cy.viewport(Cypress.env('DEVICE_NAME')); 
           
});

it('Login and logout as a personal user', () => {

loginPage.login(TestData.email, TestData.password);

cy.log('click on the user name and log out')
logOut.signOut();
cy.log('Logging out completed')

})

})