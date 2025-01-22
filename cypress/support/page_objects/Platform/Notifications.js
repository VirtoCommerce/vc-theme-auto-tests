
class RegistrationNotificationTests {
    constructor(baseUrl) {
      this.baseUrl = baseUrl
      
    }
  
    // Test: Check if the registration notification was sent and validate email
    validateNotificationEmail(customerEmail2,authToken) {
    
    const payload = {
     
    "notificationType": "ConfirmationEmailNotification",
    "keyword": customerEmail2,
    "skip": 0,
    "sort": "",
    "take": 5

    }; 

      cy.request({
        method: 'POST',
        url: `${this.baseUrl}/api/notifications/journal`,
        body: payload,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        // Check if the email matches
        const email = response.body.results[0]?.to;
        expect(email).to.include(customerEmail2);
        cy.log('Email validated:', email);
      });
    }
  
    // Test: Extract and save UserId from the response
    extractAndSaveUserId(customerEmail2, authToken) {
        const payload = {     
            "notificationType": "ConfirmationEmailNotification",
            "keyword": customerEmail2,
            "skip": 0,
            "sort": "",
            "take": 5     
            }; 
      cy.request({
        method: 'POST',
        url: `${this.baseUrl}/api/notifications/journal`,
        body: payload,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        const responseBody = response.body.results[0]?.body;
        const userIdRegex = /UserId=([^&]+)/;
  
        // Extract UserId
        const userIdMatch = responseBody.match(userIdRegex);
        if (userIdMatch && userIdMatch.length > 1) {
          const userId = userIdMatch[1];
          cy.readFile('cypress/fixtures/data.json').then((data) => {
            // Update MEMBER_ID
            data.user[0].USER_ID = userId;
            // Save back to the file
            cy.writeFile('cypress/fixtures/data.json', data);
            cy.log('Updated MEMBER_ID in the JSON file.');
          });
     
          cy.log('Extracted UserId:', userId);
        } else {
          cy.log('UserId not found in the response body.');
        }
      });
    }
  
    // Test: Extract and save Token from the response
    extractAndSaveToken(customerEmail2, authToken) {
        const payload = {     
            "notificationType": "ConfirmationEmailNotification",
            "keyword": customerEmail2,
            "skip": 0,
            "sort": "",
            "take": 5      
            }; 
      cy.request({
        method: 'POST',
        url: `${this.baseUrl}/api/notifications/journal`,
        body: payload,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        const responseBody = response.body.results[0]?.body;
        const tokenRegex = /Token=([^&"]+)/;
  
        // Extract the token
        const tokenMatch = responseBody.match(tokenRegex);
        if (tokenMatch && tokenMatch.length > 1) {
          const token = tokenMatch[1];
          cy.readFile('cypress/fixtures/data.json').then((data) => {
            // Update USER_TOKEN
            data.user[0].USER_TOKEN = token;
            // Save back to the file
            cy.writeFile('cypress/fixtures/data.json', data);
            cy.log('Updated USER_TOKEN in the JSON file.');
          });
          cy.log('Extracted Token:', token);
        } else {
          cy.log('Token not found in the response body.');
        }
      });
    }
  
    // Test: Extract and save the last URL from the response
    extractAndSaveLastUrl(customerEmail2, authToken) {
        const payload = {     
            "notificationType": "ConfirmationEmailNotification",
            "keyword": customerEmail2,
            "skip": 0,
            "sort": "",
            "take": 5      
            }; 
      cy.request({
        method: 'POST',
        url: `${this.baseUrl}/api/notifications/journal`,
        body: payload,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        const responseBody = response.body.results[0]?.body;
        const urlRegex = /https:\/\/[^\s">]+/;
  
        // Extract matching URLs
        const matches = responseBody.match(urlRegex);
  
        if (matches && matches.length > 0) {
          // Extract the last URL and clean up
          let lastUrl = matches[matches.length - 1];
          lastUrl = lastUrl.replace(/<\/a>$/, ''); 
          cy.readFile('cypress/fixtures/data.json').then((data) => {
            // Update URL
            data.user[0].URL = lastUrl;
            // Save back to the file
            cy.writeFile('cypress/fixtures/data.json', data);
            cy.log('Updated URL in the JSON file.');
          });
          cy.log('Extracted Last URL:', lastUrl);
        } else {
          cy.log('No URLs found in the response body.');
        }
      });
    }

  } 

  export default RegistrationNotificationTests;
  