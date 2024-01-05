import AuthLogin from '../support/navigation/AuthLogin';


describe('Sign-up page: validation', () => {
  beforeEach(() =>{
    AuthLogin.visitSignUpPage()     
  })  

  it('Validation required fields for personal account', () => {

    cy.get('[type="radio"]').first().check().should('be.checked')

    cy.get('#input-41').type('Mila')
    cy.get('#input-44').type('Mur')
    cy.get('#input-47').type('mila-mur@mail.com')
    cy.get('#input-50').type('Password1')
    cy.get('#input-54').type('Password1')
    cy.get('[type="submit"]').should('be.exist')
    cy.get('[type="submit"]').contains('Sign up').click()   
    cy.wait(1000)
    cy.location('pathname').should('eq', "/successful-registration")
    cy.get('.vc-typography--variant--h2').contains("Registration completed")
    cy.get('.flex > .vc-button').should('be.exist')

  })

  
  it.only('Validation required fields for company account', () => {

    cy.get('[type="radio"]').last().check().should('be.checked') 

    cy.get('#input-41').type('Andrew')
    cy.get('#input-44').type('Cook')
    cy.get('#input-47').type('andrew+cook@mail.com')
    cy.get('[name="organizationName"]').type('Andrew Corporate')
    cy.get('#input-50').type('Password1')
    cy.get('#input-54').type('Password1')
    cy.get('[type="submit"]').should('be.exist')
    cy.get('[type="submit"]').contains('Sign up').click()   
    cy.wait(1000)
    cy.location('pathname').should('eq', "/successful-registration")
    cy.get('.vc-typography--variant--h2').contains("Registration completed")
    cy.get('.flex > .vc-button').should('be.exist')

  })

})