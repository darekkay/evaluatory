const { join } = require("path");
const { outputJson } = require("fs-extra");

const { HtmlValidate } = require("html-validate");

const { render } = require("../../utils/render");

/** Module to validate HTML of a page */
module.exports = async ({ pageSource, moduleName, index, config }) => {
  const htmlvalidate = new HtmlValidate(config.modulesConfig[moduleName]);
  const validationResult = htmlvalidate.validateString(pageSource);
  const issueCount =
    validationResult.errorCount + validationResult.warningCount;

  let violations = [];
  if (validationResult.results.length > 0) {
    violations = validationResult.results[0].messages;
  }

  const jsonFileName = `${index}-${moduleName}.json`;
  await outputJson(join(config.output, jsonFileName), validationResult);
  const html = await render(join(__dirname, "template.njk"), {
    violations,
    issueCount,
    jsonFileName,
  });

  return { issueCount, html };
};
