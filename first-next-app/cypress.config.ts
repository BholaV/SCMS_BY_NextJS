// cypress.config.ts

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,ts,jsx,tsx}',
    supportFile: 'cypress/support/e2e.ts', // Ensure this path is correct
  },
});
