const { series } = require("gulp");

const config = require("./gulp.config");

const clean = require("./tasks/clean")(config);
const styles = require("./tasks/styles")(config);
const assets = require("./tasks/assets")(config);

const build = series(clean, styles, assets);

module.exports = { build, clean, styles };
