const { defineConfig } = require("cypress");

require('dotenv').config();

module.exports = defineConfig({
  env: {
    LOGIN_PERSONAL_EMAIL: process.env.LOGIN_PERSONAL_EMAIL,
    LOGIN_PERSONAL_PASSWORD: process.env.LOGIN_PERSONAL_PASSWORD,
    LOGIN_CORP_EMAIL: process.env.LOGIN_CORP_EMAIL,
    LOGIN_CORP_PASSWORD: process.env.LOGIN_CORP_PASSWORD,
    baseUrl:'https://virtostart-demo-store.govirto.com',
    baseUrl: process.env.PLATFORM_URL,
    viewportWidth: 1600,
    viewportHeight: 700
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
