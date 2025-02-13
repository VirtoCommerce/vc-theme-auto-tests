require('dotenv').config();



module.exports = (on, config) => {
  config.env = config.env || {};
  config.env.username = process.env.LOGIN_CORP_EMAIL;
  config.env.password = process.env.LOGIN_CORP_PASSWORD;
  return config;
};

console.log('CORP_LOGIN:', process.env.LOGIN_CORP_EMAIL);
console.log('CORP_PASSWORD:', process.env.LOGIN_CORP_PASSWORD);


module.exports = (on, config) => {
  // Middleware
  on('before:browser:launch', (browser = {}, launchOptions) => {
    
    console.log('Launching browser:', browser.name);
    return launchOptions;
  });

  // Task Registration
  on('task', {
    async logMessage(message) {
      console.log('From task:', message);
      return null;
    },
  });

  // Event Listeners
  on('file:preprocessor', (file) => {
    
    console.log('Preprocessing file:', file.filePath);
    return file;
  });
};

const TestRailReporter = require('cypress-testrail');

module.exports = (on, config) => {
    new TestRailReporter(on, config).register();
    return config
};

const allureCypress = require('allure-cypress');
module.exports = (on, config) => {
    allureCypress(on, config);
    return config;
};