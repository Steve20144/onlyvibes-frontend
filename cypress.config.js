const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    defaultCommandTimeout: 10000,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
