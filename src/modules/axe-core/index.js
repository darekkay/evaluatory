/* eslint-env browser */

const _ = require("lodash");
const { readFile, outputJson } = require("fs-extra");
const { join } = require("path");

const { render } = require("../../utils/render");

const injectAxe = async (page) => {
  const axeScript = await readFile(
    join(__dirname, "../../../node_modules/axe-core/axe.min.js"),
    "utf8"
  );
  // eslint-disable-next-line no-eval
  await page.evaluate((axe) => window.eval(axe), axeScript);
};

/** Module to run axe-core per specified breakpoint */
module.exports = async ({ page, moduleName, index, config }) => {
  await injectAxe(page);

  const violationsPerDevice = {};

  // run axe-core per breakpoint
  for (const { name: deviceName, options: deviceOptions } of config.devices) {
    await page.setViewportSize(deviceOptions.viewport);

    const axeResults = await page.evaluate(
      ({ moduleConfig }) => {
        return window.axe.run(window.document, moduleConfig);
      },
      { moduleConfig: config.modulesConfig["axe-core"] }
    );

    violationsPerDevice[deviceName] = axeResults.violations;
  }

  // de-duplicate violations per breakpoint
  const violations = Object.entries(violationsPerDevice).reduce(
    (accumulator, [deviceName, deviceViolations]) => {
      deviceViolations.forEach((violation) => {
        const accumulatedViolation = _.find(accumulator, violation);
        if (!accumulatedViolation) {
          violation.breakpoints = [deviceName];
          violation.icon = `../../assets/icons/severity-${violation.impact}.svg`;
          accumulator.push(violation);
        } else {
          accumulatedViolation.breakpoints.push(deviceName);
        }
      });
      return accumulator;
    },
    []
  );

  const jsonFileName = `${index}-${moduleName}.json`;
  await outputJson(join(config.output, jsonFileName), {
    violations,
  });
  const html = await render(join(__dirname, "template.njk"), {
    violations,
    jsonFileName,
  });

  return { issueCount: violations.length, html };
};
