import CatalogPage from "../../../support/page_objects/CatalogPage/CatalogPage";
import LoginPage from "../../../support/page_objects/LoginPage/LoginPage";
import userData from "../../Variables/userData";


describe('Add/remove products to Lists', ()=> {
   
const catalogPage = new CatalogPage();
const loginPage = new LoginPage();    

beforeEach(() => {
cy.clearCookies();
cy.clearLocalStorage(); 
cy.viewport(Cypress.env('DEVICE_NAME'));

       
});

it('Star is grey > Add product anonymously', ()=> {

catalogPage.visit('catalog');
cy.get('h2').should('be.visible');
catalogPage.addToListAnonim('List');

});

it('Star is orange > Add product to the wish list from List view', () => {

loginPage.login(userData.userData[0].email, userData.userData[0].password);
cy.get('h2').should('be.visible');
catalogPage.addToList('List');

})
})