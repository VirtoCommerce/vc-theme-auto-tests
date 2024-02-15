
import AuthLogin from '../../../support/navigation/AuthLogin';
import userData from '../../../e2e/Variables/userData';

class SignUpPage{

 

startFromHome(){

       
        AuthLogin.visitHomePage();
        cy.log('Step: Visited Home Page'); // Logging
        cy.get('h2').should('be.visible').and('have.text', "Daily Deals");
        cy.get('[href="/sign-up"]').click();
        cy.get('h1').should('be.visible').contains('Registration');
        cy.location("pathname").should('eq', "/sign-up");        
        cy.get('form').should('be.visible');
        cy.log('Step: Open sign-up page');      
        
     
        
}
   
checkLabelsPersonal(){



       cy.log('Step: Verifying labels for personal account'); // Logging

        cy.get('[type="radio"]').first().should('be.checked');   
        cy.get('[aria-checked]').should('be.enabled');    
        cy.get('span').contains('Personal account');    
        cy.get('.vc-label').should('have.length', 5);
        cy.get('.vc-label__asterisk').should('have.length', 5).contains('*');        
        cy.get('label').should('have.class', 'vc-label').contains("First Name");    
        cy.get('label').should('have.class', 'vc-label').contains("Last Name");    
        cy.get('label').should('have.class', 'vc-label').contains("Email");    
        cy.get('label').should('have.class', 'vc-label').contains("Password");    
        cy.get('label').should('have.class', 'vc-label').contains("Confirm password");
    
        
    }

      checkLabelsCompany(){

      
          cy.log('Step: Verifying labels for company account'); 

            cy.get('[type="radio"]').last().check().should('be.checked');   
            cy.get('[aria-checked]').last().should('be.enabled');      
            cy.get('span').contains('Company account');            
            cy.get('.vc-label').should('have.length', 6);
            cy.get('.vc-label__asterisk').should('have.length', 6).contains('*');            
            cy.get('label').should('have.class', 'vc-label').contains("First Name");        
            cy.get('label').should('have.class', 'vc-label').contains("Last Name");        
            cy.get('label').should('have.class', 'vc-label').contains("Email");        
            cy.get('label').should('have.class', 'vc-label').contains("Company name");        
            cy.get('label').should('have.class', 'vc-label').contains("Password");        
            cy.get('label').should('have.class', 'vc-label').contains("Confirm password");
      

      }



personalRegistration(){

      cy.log('Step: create personal account');

        cy.get('[type="radio"]').first().check().should('be.checked');
    
        cy.get('input[name=firstName]').type(userData.userData[0].first_name);
        cy.get('input[name=lastName]').type(userData.userData[0].last_name);
        cy.get('input[name=email]').type(userData.userData[0].email);
        cy.get('[type="password"]').eq(0).type(userData.userData[0].password);
        cy.get('[placeholder="Confirm your password"]').type(userData.userData[0].confirm_password);
        cy.get('[type="submit"]').should('be.exist');
        cy.get('[type="submit"]').contains('Sign up').click();   
        cy.get('.vc-typography--variant--h2').should('be.visible').and('have.text', 'Registration completed');
        cy.location('pathname').should('eq', "/successful-registration");        
        cy.get('.flex > .vc-button').should('be.exist');
        cy.log('Personal account is created');    
   
}

companyRegistration(){

        cy.log('Step: create company account');

        cy.get('[type="radio"]').last().check().should('be.checked'); 
    
        cy.get('input[name=firstName]').type(userData.userData[1].first_name);
        cy.get('input[name=lastName]').type(userData.userData[1].last_name);
        cy.get('input[name=email]').type(userData.userData[1].email);
        cy.get('[name="organizationName"]').type(userData.userData[1].company_name);
        cy.get('[type="password"]').eq(0).type(userData.userData[1].password);
        cy.get('[placeholder="Confirm your password"]').type(userData.userData[1].confirm_password);
        cy.get('[type="submit"]').should('be.exist');
        cy.get('[type="submit"]').contains('Sign up').click();   
        cy.get('.vc-typography--variant--h2').should('be.visible').and('have.text', 'Registration completed');
        cy.location('pathname').should('eq', "/successful-registration");        
        cy.get('.flex > .vc-button').should('be.exist');
        cy.log('Company account is created'); 

}

}

export default SignUpPage;