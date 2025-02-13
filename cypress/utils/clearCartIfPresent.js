import cartPageLocators from "../pageObjects/cartPage/cartPageLocators";
import ClearCartPopUp from "../pageObjects/cartPage/clearCartPopUp/clearCartPopUp";
import Header from "../pageObjects/header/header";
import SimpleUtils from "./simpleUtils";

function clearCartIfPresent () {

    //Instantiate classes
    const header = new Header()
    const clearCartPopUp = new ClearCartPopUp()

    //Log in
    SimpleUtils.login()

    //Navigate to the cart
    header.clickCartIcon()
    SimpleUtils.waitForLoader()

    //Click "clear cart" if exists, else leave
    cy.get(cartPageLocators.clearCartButton)
    .if('exists')
        .then(($clearCartButton) => {
            cy.wrap($clearCartButton)
            .click()
            clearCartPopUp.clickDeleteButton()
            SimpleUtils.waitForLoader()
            cy.log('The cart has been cleared')
        })
    .else(cy.log('the cart is empty'))

    //Log out
    SimpleUtils.logout()
 
}

export default clearCartIfPresent;