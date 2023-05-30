const { devices: playwrightDevices } = require("playwright");

module.exports = {
  // Output folder
  output: "evaluatory-results",

  // URLs to evaluate
  urls: [],

  // Modules to run
  modules: ["base", "axe-core", "html-validate", "screenshot"],

  // Max number of parallel connections
  maxConnections: 5,

  // Open the results page after evaluation
  openResults: true,

  // Sitemap URL. If provided, all URLs from the sitemap will be evaluated
  sitemap: undefined,

  // Device variants to check
  devices: [
    { name: "phone", options: playwrightDevices["iPhone 7"] },
    { name: "tablet", options: playwrightDevices["iPad (gen 7)"] },
    {
      name: "desktop",
      options: {
        viewport: {
          width: 1440,
          height: 720,
        },
      },
    },
  ],

  // Custom Playwright options: https://playwright.dev/docs/api/class-browser#browser-new-context
  playwrightOptions: {
    // Browser color scheme ("light", "dark", "no-preference")
    colorScheme: "light",
  },

  // Handles HTTP status codes above 400 as errors, i.e., evaluatory modules will not be executed.
  handleHttpErrorCodes: true,

  // Return exit code 1 in case of any error/issue (useful for CI environments)
  shouldFailOnIssue: false,

  // Playwright browser to use. One of "chromium", "firefox" or "webkit".
  browser: "chromium",

  // Module configuration
  modulesConfig: {
    base: {
      // check for horizontal overflows
      "horizontal-content-overflow": true,
    },

    "axe-core": {
      rules: {
        // by default, all rules except "experimental" are executed
        // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md

        // this rule doesn't make any sense: https://yatil.social/@yatil/110423042090716039
        "landmark-complementary-is-top-level": "off"
      },
    },

    "html-validate": {
      // https://html-validate.org/usage/index.html#configuration
      extends: ["html-validate:recommended"],
      rules: {
        "attr-case": "off",
        "attr-spacing": "off",
        "attr-quotes": "off",
        "attribute-boolean-style": "off",
        "attribute-empty-style": "off",
        "doctype-style": "off",
        "element-case": "off",
        "element-permitted-content": "off", // too strict
        "element-required-attributes": "off", // too many false-positives
        "no-inline-style": "off",
        "no-raw-characters": "off", // too many false-positives
        "no-redundant-role": "off",
        "no-self-closing": "off",
        "no-trailing-whitespace": "off",
        "no-utf8-bom": "off",
        "require-csp-nonce": "off",
        "require-sri": "off",
        "svg-focusable": "off",
        "void-style": "off",
      },
    },
  },
};
