//import '../support/commands';
require('dotenv').config();

const TestRailReporter = require('cypress-testrail');

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
    // Настройка конфигурации браузера перед его запуском
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
    // Обработчик для события перед обработкой файла
    console.log('Preprocessing file:', file.filePath);
    return file;
  });
};


module.exports = (on, config) => {
    new TestRailReporter(on, config).register();
    return config;
};