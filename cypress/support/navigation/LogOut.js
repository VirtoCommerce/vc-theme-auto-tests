import userData from "../../e2e/Variables/userData";

class LogOut{

signOut(user_name){

cy.get('span[class="font-bold"]').contains(user_name).should('be.visible').click();
cy.contains('span', user_name).should('be.visible');
cy.get('button[title="Logout"]').should('be.visible').click(); 
cy.get('a[href="/sign-up"]').should('be.visible');
cy.contains('a', "Sign up now");

}

}

export default LogOut;