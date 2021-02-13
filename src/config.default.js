const { devices: playwrightDevices } = require("playwright");

module.exports = {
  // Output folder
  output: "evaluatory-results",

  // URLs to evaluate
  urls: [],

  // Max number of parallel connections
  maxConnections: 5,

  // Modules to run
  modules: ["axe-core", "html-validate", "screenshot"],

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

  // Return exit code 1 in case of any error/issue (useful for CI environments)
  shouldFailOnIssue: false,

  // Module configuration
  modulesConfig: {
    "axe-core": {
      rules: {
        // by default, all rules except "experimental" are executed
        // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
      },
    },

    "html-validate": {
      // https://html-validate.org/usage/index.html#configuration
      extends: ["html-validate:recommended"],
      rules: {
        "attr-case": "off",
        "attr-quotes": "off",
        "attribute-boolean-style": "off",
        "attribute-empty-style": "off",
        "element-case": "off",
        "element-permitted-content": "off", // too strict
        "element-required-attributes": "off", // too many false-positives
        "no-inline-style": "off",
        "no-raw-characters": "off", // too many false-positives
        "no-self-closing": "off",
        "no-trailing-whitespace": "off",
        "require-sri": "off",
        "svg-focusable": "off",
        "void-style": "off",
      },
    },
  },
};
