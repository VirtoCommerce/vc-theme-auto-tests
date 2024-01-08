import TestData from './Variables/TestData';

describe('Sign-in page', () => {
  it('Login', () => {
    cy.login(TestData.email, TestData.password)
  })
})
