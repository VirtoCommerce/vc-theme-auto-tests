const { defineConfig } = require("cypress");

require('dotenv').config();

module.exports = defineConfig({
  projectId: 'fqhmiq',
  env: {
    LOGIN_PERSONAL_EMAIL: process.env.LOGIN_PERSONAL_EMAIL,
    LOGIN_PERSONAL_PASSWORD: process.env.LOGIN_PERSONAL_PASSWORD,

    CARD_NUMBER_VISA: process.env.CARD_NUMBER_VISA,
    CARD_NUMBER_MASTERCARD: process.env.CARD_NUMBER_MASTERCARD,
    CVV: process.env.CVV,

    PLATFORM_URL: process.env.PLATFORM_URL,
    DEVICE_NAME: process.env.DEVICE_NAME,
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
