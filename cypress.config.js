const { defineConfig } = require("cypress");

require('dotenv').config();

module.exports = defineConfig({
  projectId: '4qfpp4', 
  env: {
    LOGIN_PERSONAL_EMAIL: process.env.LOGIN_PERSONAL_EMAIL,
    LOGIN_PERSONAL_PASSWORD: process.env.LOGIN_PERSONAL_PASSWORD,

    LOGIN_CORP_EMAIL: process.env.LOGIN_CORP_EMAIL,
    LOGIN_CORP_PASSWORD: process.env.LOGIN_CORP_PASSWORD,

    CARD_NUMBER_VISA: process.env.CARD_NUMBER_VISA,
    CARD_NUMBER_MASTERCARD: process.env.CARD_NUMBER_MASTERCARD,
    CVV: process.env.CVV,

    PLATFORM_URL: process.env.PLATFORM_URL,
    DEVICE_NAME: process.env.DEVICE_NAME,
  },
  e2e: {
    setupNodeEvents(on, config) {
  return require('./cypress/plugins/index')(on, config)
    },
  },  
  testrail: {
  domain: "virtowayqa.testrail.io",
  apikey: "sWC5LzaMIvE.wfPoOeiC-VbDQ9Y1gsGS5O8/i8L7J",
  runId: "R13618",
  screenshots: false    
}
});
