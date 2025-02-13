import SimpleUtils from "./simpleUtils";
import TestData from "../testData";

function generateInvitationLink() {

    //Instantiate classes
    const userData = TestData.userData();

    //Send registration request and get the invitation link
    const url = Cypress.env('backUrl') + '/api/v1/opus-registration'
    
    //Prepare the request body
    const body = {

        "outer_id": SimpleUtils.generateUUID(),
        "first_name": userData.firstName,
        "last_name": userData.lastName,
        "email": SimpleUtils.generateEmail(),
        "phone": userData.phone,
        "zip_code": userData.zip,
        "job_title": userData.jobTitle,
        "organization_name": userData.organizationName,
        "organization_outer_id": SimpleUtils.generateUUID(),
        "created_way": "",
        "sub_source": "",
        "accept_terms_and_conditions": true

    };

    //Send the request
    cy.log(url)
    return cy.request({
        
        method: 'POST',
        url: url,
        body: body,
        headers: {
            'Content-Type': 'application/json-patch+json',
            'api_key': Cypress.env('api_key')
        }

    }).then((response) => {
        
        //Validate results and extract the link
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('redirect_url').and.not.be.empty; 
        const invitationLink = response.body.redirect_url.replace(/^"|"$/g, '');
        return invitationLink;

    })
};

export default generateInvitationLink;