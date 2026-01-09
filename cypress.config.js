const { defineConfig } = require("cypress");

/**
 * Cypress E2E Testing Configuration.
 * Sets the base URL for the local development server and global timeouts.
 */
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    defaultCommandTimeout: 10000,
  },
});