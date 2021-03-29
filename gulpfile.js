const { gulp, tasks } = require("@darekkay/gulp");

const config = {
  paths: {
    destination: "src/assets/dist",

    assets: [
      {
        source: "src/assets/src/assets/**/*",
        destination: "src/assets/dist",
      },
      {
        source: "node_modules/@darekkay/styles/dist/css/fonts/**/*",
        destination: "src/assets/dist/fonts",
      },
    ],

    styles: {
      source: "src/assets/src/styles.scss",
      destination: "src/assets/dist",
    },

    icons: {
      source: "src/assets/icons/**/*.svg",
      destination: "src/assets/dist/icons",
    },
  },
};

const { series } = gulp;
const { clean, styles, assets, icons, env } = tasks(config);

const build = series(env("production"), clean, styles, assets, icons);

module.exports = { build, clean, styles };
