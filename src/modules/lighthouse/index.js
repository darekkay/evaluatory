const { join } = require("path");

const _ = require("lodash");
const { readFile, existsSync, outputJson } = require("fs-extra");
const lighthouse = require("lighthouse");
const logger = require("@darekkay/logger");
const moduleVersion = require("lighthouse/package.json").version;

const { render } = require("../../utils/render");

/** Module to run lighthouse per specified breakpoint */
module.exports = async ({ page, moduleName, index, config }) => {
  const results = await lighthouse(page.url(), {
    output: "json",
    logLevel: "silent",
    port: 9222,
  });

  const jsonFileName = `${index}-${moduleName}.json`;
  await outputJson(join(config.output, jsonFileName), {
    results,
  });

  const issueCount = 0;

  const html = await render(join(__dirname, "template.njk"), {
    issueCount,
    moduleVersion,
    jsonFileName,
  });

  return { issueCount, html };
};
