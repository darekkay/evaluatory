const { join } = require("path");

const { gulp, tasks } = require("@darekkay/gulp");

const path = (...args) => join(__dirname, ...args);

const config = {
  paths: {
    destination: path("src/assets/dist"),

    assets: [
      {
        source: `${path("src", "assets", "src", "assets")}/**/*`,
        destination: path("src", "assets", "dist"),
      },
      {
        source: `${path(
          "node_modules",
          "@darekkay",
          "styles",
          "dist",
          "css",
          "fonts"
        )}/**/*`,
        destination: path("src", "assets", "dist", "fonts"),
      },
    ],

    styles: {
      source: path("src", "assets", "src", "styles.scss"),
      destination: path("src", "assets", "dist"),
    },

    icons: {
      source: path("src", "assets", "icons"),
      destination: path("src", "assets", "dist", "icons"),
    },
  },
};

const { series } = gulp;
const { clean, styles, assets, icons, env } = tasks(config);

const build = series(env("production"), clean, styles, assets, icons);

module.exports = { build, clean, styles };
