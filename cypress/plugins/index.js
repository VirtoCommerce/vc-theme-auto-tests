import '../support/commands';
require('dotenv').config();

module.exports = (on, config) => {
  config.env = config.env || {};
  config.env.username = process.env.OPUS_LOGIN;
  config.env.password = process.env.OPUS_PASSWORD;
  return config;
};

console.log('OPUS_LOGIN:', process.env.OPUS_LOGIN);
console.log('OPUS_PASSWORD:', process.env.OPUS_PASSWORD);


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
