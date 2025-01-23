

class DeleteData {

  deleteUsers(userEmail, authToken) {

    const url1 = `${Cypress.env('BASE_URL')}/api/platform/security/users`;
    const email = userEmail;

    cy.request({
      method: 'DELETE',
      url: `${url1}?names=${encodeURIComponent(email)}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('succeeded', true);
      cy.log('Delete user response:', response.body);
    });
  }

  deleteContact(auth_token) {

    const baseUrl = `${Cypress.env('BASE_URL')}/api/members`;

    cy.readFile('cypress/fixtures/data.json').then((data) => {
      const memberIds = data.env[0].MEMBER_ID;

      memberIds.forEach((memberId) => {
        if (!memberId) {
          cy.log('MEMBER_ID is not defined in data.json');
        } else {
          cy.log('Retrieved MEMBER_ID:', memberId);

          cy.request({
            method: 'DELETE',
            url: `${baseUrl}?ids=${memberId}`,
            headers: {
              Authorization: `Bearer ${auth_token}`,
              'Content-Type': 'application/json',
            },
            failOnStatusCode: false
          }).then((response) => {
            cy.log('Response status:', response.status);
            cy.log('Response body:', response.body);

            if (response.status === 204) {
              cy.log('Member deleted successfully:', memberId);
            } else {
              cy.log('Failed to delete member:', memberId);
            }

            expect(response.status).to.eq(204, `Failed to delete member ${memberId}`);
          });
        }
      });
    });

    cy.log('All members deleted successfully');



  }

  deleteOrganization(authToken) {

    const baseUrl = `${Cypress.env('BASE_URL')}/api/organizations`;
    // Read COMPANY_ID from the file   

    cy.readFile('cypress/fixtures/data.json').then((data) => {
      const orgIds = data.env[0].COMPANY_ID;

      orgIds.forEach((orgId) => {
        if (!orgId) {
          cy.log('Company_ID is not defined in data.json');
        } else {
          cy.log('Retrieved COMPANY_ID:', orgId);

          cy.request({
            method: 'DELETE',
            url: `${baseUrl}?ids=${orgId}`,
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
            failOnStatusCode: false
          }).then((response) => {
            cy.log('Response status:', response.status);
            cy.log('Response body:', response.body);

            if (response.status === 204) {
              cy.log('Member deleted successfully:', orgId);
            } else {
              cy.log('Failed to delete org:', orgId);
            }
            expect(response.status).to.eq(204, `Failed to delete org ${orgId}`);
          });
        }
      });
    });
  }

}

export default DeleteData;

