const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const {addCucumberPreprocessorPlugin} = require("@badeball/cypress-cucumber-preprocessor");
const {preprendTransformerToOptions} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions))
  );

  return config;
}

module.exports = defineConfig({
  projectId: 'jzks2m',
  defaultCommandTimeout: 10000,
  reporter: 'cypress-mochawesome-reporter',
  env: {
    url: "https://rahulshettyacademy.com"
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/integration/examples/BDD/*.feature"
  },
});