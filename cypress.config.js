const { defineConfig } = require("cypress");

require("dotenv").config();

module.exports = defineConfig({
  projectId: 'fqhmiq',

  env: {
    LOGIN_PERSONAL_EMAIL: process.env.LOGIN_PERSONAL_EMAIL,
    LOGIN_PERSONAL_PASSWORD: process.env.LOGIN_PERSONAL_PASSWORD,

    LOGIN_CORP_EMAIL: process.env.LOGIN_CORP_EMAIL,
    LOGIN_CORP_PASSWORD: process.env.LOGIN_CORP_PASSWORD,

    CARD_NUMBER_VISA: process.env.CARD_NUMBER_VISA,
    CARD_NUMBER_MASTERCARD: process.env.CARD_NUMBER_MASTERCARD,
    CVV: process.env.CVV,

    PLATFORM_URL: process.env.PLATFORM_URL,
    BASE_URL: process.env.BASE_URL,
    DEVICE_NAME: process.env.DEVICE_NAME,

    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
  },

  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index")(on, config);
    },
  },

  testrail: {
    domain: "virtowayqa.testrail.io",
    apikey: "sWC5LzaMIvE.wfPoOeiC-VbDQ9Y1gsGS5O8/i8L7J",
    runId: "R13618",
    screenshots: false,
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});

