const _ = require("lodash");
const { readFileSync } = require("fs-extra");
const json5 = require("json5");
const logger = require("@darekkay/logger");

const defaultConfig = require("../config.default");

// eslint-disable-next-line consistent-return
const configArrayCustomizer = (objectValue, sourceValue) => {
  // arrays will be overwritten with the highest priority value
  if (_.isArray(objectValue)) {
    return sourceValue;
  }
};

const getConfig = (cliArguments = {}) => {
  const configPath = cliArguments.config;

  let userConfig = {};

  if (configPath) {
    try {
      userConfig = json5.parse(readFileSync(configPath, "utf-8"));
    } catch (error) {
      logger.error(error);
    }
  }

  const argvConfig = {
    output: cliArguments.output,
    modules: cliArguments.modules ? cliArguments.modules.split(",") : undefined,
    urls: cliArguments.url ? [cliArguments.url] : undefined,
    openResults: cliArguments["no-open-results"] ? false : undefined,
  };

  return _.mergeWith(
    {},
    defaultConfig,
    userConfig,
    argvConfig,
    configArrayCustomizer
  );
};

module.exports = getConfig;
