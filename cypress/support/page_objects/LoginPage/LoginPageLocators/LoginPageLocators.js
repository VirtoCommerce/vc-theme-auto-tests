// LoginPage Locators
// This object contains locators for elements on the Login Page.
export const LoginPageLocators = {
    // Input field for email during login
    EMAIL_INPUT: 'input[placeholder="Enter your email address"]',
    
    // Input field for password during login
    PASSWORD_INPUT: 'input[placeholder="Enter your password"]',
    
    // Button to submit the login form
    // Note: Using relative XPath for better resilience against UI changes
    LOGIN_BUTTON: '//button[@type="submit"]',
    
    // Locator for an error message during login failure
    // Note: Using relative XPath for better resilience against UI changes
    ERROR_MESSAGE: '//div[@class="vc-alert__content"]/span[text()="Login attempt failed. Please check your credentials"]'
  };
  