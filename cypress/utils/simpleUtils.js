import commonElementsLocators from "../pageObjects/commonElements/commonElementsLocators";
import navigation from "../navigation/navigation";
import LoginPage from "../pageObjects/loginPage/loginPage";
import HeaderTop from "../pageObjects/headerTop/headerTop";

const loginPage = new LoginPage();
const headerTop = new HeaderTop();

class SimpleUtils {

    static generateEmail() {
        // A method to generate a unique email with a short timestamp
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');

        const shortTimestamp = `${month}${day}${hour}${minute}${second}`;
        return `autoCY${shortTimestamp}@mail.com`;
    };

    static generateUUID() {
        return [1e7].toString().replace(/[018]/g, (c) => {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    };

    static getRandomItemFromList(list) {
        // Utility to pick a random item from a container
        return Cypress._.sample(list.toArray());
    }

    static waitForLoader() {
        cy.get(commonElementsLocators.loader).should('exist')
        cy.get(commonElementsLocators.loader).should('not.exist')
    }
    
    static login() {
        loginPage.visit()
        loginPage.login(Cypress.env('username'), Cypress.env('password'))
        cy.url().should('eq', navigation.homePage)
    }

    static logout() {
        headerTop.userContactButtonClick()
        headerTop.logoutButtonClick()
        cy.url().should('include', navigation.signInPage)
    }
    
}

export default SimpleUtils;