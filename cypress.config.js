const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "http://automationpractice.com",
    "pageLoadTimeout": 100000,
    "defaultCommandTimeout": 100000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
