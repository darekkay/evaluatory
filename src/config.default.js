const { devices: playwrightDevices } = require("playwright");

module.exports = {
  // Output folder
  output: "results",

  // URLs to evaluate
  urls: [],

  // Max number of parallel connections
  maxConnections: 5,

  // Modules to run
  modules: ["axe-core", "screenshot"],

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

  // Module configuration
  modulesConfig: {
    "axe-core": {
      rules: {
        // by default, all rules except "experimental" are executed
        // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
      },
    },
  },
};
