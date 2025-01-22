
class Platform {

    loginPlatform() {

        cy.visit(`${Cypress.env('BASE_URL')}/#!/login`);
        cy.get(`input[name="login"]`).type(`${Cypress.env('ADMIN_NAME')}`);
        cy.get(`input[name="password"]`).type(`${Cypress.env('ADMIN_PASSWORD')}`);
        cy.get(`button[type="submit"]`).click();

    }

    getAdminToken() {

        let adminToken = null;

        const apiUrl = `${Cypress.env('BASE_URL')}/connect/token`;
        const bodyParams = {
            grant_type: 'password',
            scope: 'offline_access',
            username: Cypress.env('ADMIN_NAME'),
            password: Cypress.env('ADMIN_PASSWORD'),
        };

        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(bodyParams).toString(), // Encode body parameters
        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('access_token');
            expect(response.body).to.have.property('expires_in');
            expect(response.body).to.have.property('token_type', 'Bearer');

            // Save the token to Cypress environment for future use
            adminToken = response.body.access_token;
            Cypress.env('ADMIN_TOKEN', adminToken);

            // Compare the stored token with the current token
            const savedToken = Cypress.env('ADMIN_TOKEN');
            cy.log('Token is valid:', savedToken === adminToken);
            cy.log('Stored Token:', Cypress.env('ADMIN_TOKEN'));
            cy.log('Access Token Matches:', Cypress.env('ADMIN_TOKEN') === adminToken);

        });
    }

    getContactId(memberName, authToken) {


        const endpoint = `${Cypress.env('BASE_URL')}/api/members/search`;
        const payload = {
            memberId: null,
            keyword: memberName,
            deepSearch: true,
            sort: "",
            skip: 0,
            take: 20,
            objectType: "Member",
        };

        cy.request({
            method: 'POST',
            url: endpoint,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: payload,
        }).then((response) => {

            expect(response.status).to.eq(200);
            // Validate the response structure
            const responseData = response.body;
            expect(responseData).to.have.property('totalCount').that.is.a('number');
            expect(responseData).to.have.property('results').that.is.an('array');

            // Log the first result for debugging
            if (responseData.results.length > 0) {
                const firstMemberId = responseData.results[0].id;
                // Write MEMBER_ID to a JSON file
                cy.readFile('cypress/fixtures/data.json').then((data) => {
                    data.env[0].MEMBER_ID = firstMemberId;
                    // Save back to the file
                    cy.writeFile('cypress/fixtures/data.json', data);
                    cy.log('Updated MEMBER_ID in the JSON file.');
                });

            } else {
                cy.log('No members found matching the keyword.');
            }

        });



    }


    getOrganizationtId(orgName, authToken) {


        const endpoint = `${Cypress.env('BASE_URL')}/api/members/search`;
        const payload = {
            memberId: null,
            keyword: orgName,
            deepSearch: true,
            sort: "",
            skip: 0,
            take: 20,
            objectType: "Member",
        };

        cy.request({
            method: 'POST',
            url: endpoint,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: payload,
        }).then((response) => {

            expect(response.status).to.eq(200);
            // Validate the response structure
            const responseData = response.body;
            expect(responseData).to.have.property('totalCount').that.is.a('number');
            expect(responseData).to.have.property('results').that.is.an('array');

            // Log the first result for debugging
            if (responseData.results.length > 0) {
                const firstMemberId = responseData.results[0].id;
                // Write COMPANY_ID to a JSON file
                cy.readFile('cypress/fixtures/data.json').then((data) => {
                    data.env[0].COMPANY_ID = firstMemberId;
                    // Save back to the file
                    cy.writeFile('cypress/fixtures/data.json', data);
                    cy.log('COMPANY_ID saved to file', firstMemberId);
                });

            } else {
                cy.log('No members found matching the keyword.');
            }


        });



    }



}

export default Platform;