
import AuthLogin from '../../../support/navigation/AuthLogin';

class SignUpPage{

 

startFromHome(){

       
        AuthLogin.visitHomePage();
        cy.log('Step: Visited Home Page'); // Logging
        cy.wait(2000);
        cy.get('[href="/sign-up"]').click();
        cy.wait(1000);
        cy.location("pathname").should('eq', "/sign-up");
        cy.get('h1').contains('Registration');
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
    
        cy.get('input[name=firstName]').type('Mila');
        cy.get('input[name=lastName]').type('Mur');
        cy.get('input[name=email]').type('mila-mur@mail.com');
        cy.get('[type="password"]').eq(0).type('Password1');
        cy.get('[placeholder="Confirm your password"]').type('Password1');
        cy.get('[type="submit"]').should('be.exist');
        cy.get('[type="submit"]').contains('Sign up').click();   
        cy.wait(1000);
        cy.location('pathname').should('contain', "successful-registration");
        cy.get('.vc-typography--variant--h2').contains("Registration completed");
        cy.get('.flex > .vc-button').should('be.exist');
        cy.log('Personal account is created');    
   
}

companyRegistration(){

        cy.log('Step: create company account');

        cy.get('[type="radio"]').last().check().should('be.checked'); 
    
        cy.get('input[name=firstName]').type('Andrew');
        cy.get('input[name=lastName]').type('Cook');
        cy.get('input[name=email]').type('andrew+cook@mail.com');
        cy.get('[name="organizationName"]').type('Andrew Corporate');
        cy.get('[type="password"]').eq(0).type('Password1');
        cy.get('[placeholder="Confirm your password"]').type('Password1');
        cy.get('[type="submit"]').should('be.exist');
        cy.get('[type="submit"]').contains('Sign up').click();   
        cy.wait(1000);
        cy.location('pathname').should('contain', "successful-registration");
        cy.get('.vc-typography--variant--h2').contains("Registration completed");
        cy.get('.flex > .vc-button').should('be.exist');

        cy.log('Company account is created'); 

}

}

export default SignUpPage;