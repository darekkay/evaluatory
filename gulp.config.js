const { join } = require("path");

const path = (...args) => join(__dirname, ...args);

module.exports = {
  paths: {
    destination: path("src/assets/dist"),

    styles: {
      source: path("src", "assets", "src"),
      destination: path("src", "assets", "dist"),
    },
  },
};
