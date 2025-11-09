import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalStudio:true,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      const allureWriter = require('@shelex/cypress-allure-plugin/writer');
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
        

    retries:{
      runMode:1,
      openMode:5,
    }

  },
});
