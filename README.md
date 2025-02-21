# vc-theme-auto-tests

DEVICE_NAME - viewport https://docs.cypress.io/api/commands/viewport
Cypress docs - https://docs.cypress.io/app/get-started/install-cypress

# Cypress Installation Guide

This guide will help you set up Cypress and install all necessary dependencies to start testing.

## Prerequisites
Before installing Cypress, make sure you have the following installed:
- **Node.js** (Latest LTS version recommended) → [Download here](https://nodejs.org/)
- **npm** (Comes with Node.js) or **yarn**
- **A package manager** (npm or yarn)

## Step 1: Initialize Your Project
If you don’t have a project yet, create one:
```sh
mkdir my-cypress-project
cd my-cypress-project
npm init -y  # or yarn init -y
```

## Step 2: Install Cypress
Run the following command to install Cypress as a dev dependency:
```sh
npm install cypress --save-dev  # or yarn add cypress --dev
```

## Step 3: Open Cypress for the First Time
After installation, run:
```sh
npx cypress open  # or yarn run cypress open
```
This will:
- Create the Cypress folder structure (`cypress/`)
- Generate example tests inside `cypress/e2e/`
- Open the Cypress Test Runner

## Step 4: Run Cypress Tests
To run tests in headed mode:
```sh
npx cypress open
```
To run tests in headless mode:
```sh
npx cypress run
```

## Step 5: Install Additional Dependencies (Optional)
Depending on your project, you may need additional dependencies:

### Install TypeScript Support:
```sh
npm install typescript @cypress/webpack-preprocessor --save-dev
```

### Install ESLint for Cypress:
```sh
npm install eslint-plugin-cypress --save-dev
```

### Install Cypress Testing Library:
```sh
npm install @testing-library/cypress --save-dev
```

## Step 6: Configure Cypress (Optional)
Modify `cypress.config.js` or `cypress.config.ts` to customize settings.
Example:
```js
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 8000,
  },
});
```

## Troubleshooting
- If Cypress does not open, try running:
  ```sh
  npx cypress cache clear
  npx cypress install
  ```
- If facing permission issues, try:
  ```sh
  sudo npm install cypress --save-dev --unsafe-perm=true
  ```

## Conclusion
You have successfully installed Cypress and its dependencies. 🎉 Now you can start writing and running automated tests!


