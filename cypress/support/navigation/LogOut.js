import userData from "../../e2e/Variables/userData";

class LogOut{

signOut(){

cy.get('span[class="font-bold"]').contains(userData.userData[0].user_name).should('be.visible').click();
cy.get('div[class="absolute right-0 top-full z-10 flex w-60 flex-col space-y-3 rounded-md bg-white px-3 py-4 text-black shadow-md"]')
.should('be.visible');
cy.get('button[title="Logout"]').click(); 
cy.get('a[href="/sign-up"]').should('be.visible').and('have.text', 'Sign up now'); 

}

}

export default LogOut;