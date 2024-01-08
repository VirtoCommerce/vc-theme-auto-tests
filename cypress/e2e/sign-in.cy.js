import TestData from './Variables/Test_data';

describe('Sign-in page', () => {

  it('Login', () => {
  //cy.login(TestData.email, TestData.password)
  cy.login(TestData.corpEmail, TestData.corpPassword)  
 
  
    })

  })