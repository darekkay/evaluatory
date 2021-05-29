const _ = require("lodash");
const axios = require("axios");
const xml = require("fast-xml-parser");
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

const getUrlsForSitemap = async (sitemapUrl) => {
  try {
    const response = await axios.get(sitemapUrl);
    const sitemap = response.data;
    if (sitemap) {
      const json = xml.parse(sitemap);
      if (json && json.urlset && json.urlset.url) {
        return json.urlset.url.map((url) => url.loc);
      }
    }
  } catch (error) {
    logger.error(error.message ? error.message : error);
    return [];
  }
  return [];
};

const getConfig = async (cliArguments = {}) => {
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
    sitemap: cliArguments.sitemap,
  };

  const config = _.mergeWith(
    {},
    defaultConfig,
    userConfig,
    argvConfig,
    configArrayCustomizer
  );

  if (!["chromium", "firefox", "webkit"].includes(config.browser)) {
    // verify browser value
    throw new Error(
      `Unknown Playwright browser '${config.browser}'. Please use one of "chromium", "firefox" or "webkit".`
    );
  }

  if (config.sitemap) {
    const sitemapUrls = await getUrlsForSitemap(config.sitemap);
    if (sitemapUrls) {
      logger.info(`Adding ${sitemapUrls.length} URLs from the sitemap.`);
    }
    // if a sitemap is provided, merge its content into the URLs
    config.urls = [...(config.urls || []), ...sitemapUrls];
  }

  return config;
};

module.exports = getConfig;
