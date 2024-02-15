import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import LogOut from "../../../support/navigation/LogOut";
import userData from "../../Variables/userData";

describe('Login and Logout', ()=> {

const loginPage = new LoginPage();
const logOut = new LogOut(); 
    
    
// This block runs before each test
beforeEach(() => {
cy.viewport(Cypress.env('DEVICE_NAME')); 
           
});

it('Login and logout as a personal user', () => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);

cy.log('click on the user name and log out')
logOut.signOut(userData.userData[0].user_name);
cy.log('Logging out completed')

})

it('Login and logout as a company user', () => {

    loginPage.login(userData.userData[1].email, userData.userData[1].password);    
    cy.contains('nav', userData.userData[1].company_name);    
    cy.log('click on the user name and log out')
    logOut.signOut(userData.userData[1].user_name);
    cy.log('Logging out completed')
    
    })

})