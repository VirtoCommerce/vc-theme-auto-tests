const { defineConfig } = require("cypress");

require('dotenv').config();

module.exports = defineConfig({
  env: {
    username: process.env.LOGIN,
    password: process.env.PASSWORD,
    baseUrl: "https://vcst-qa-storefront.paas.govirto.com",
    viewportWidth: 1600,
    viewportHeight: 700
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
