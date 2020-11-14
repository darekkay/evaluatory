/* eslint-env browser */

const _ = require("lodash");
const { readFile, existsSync, outputJson } = require("fs-extra");
const { join } = require("path");
const logger = require("@darekkay/logger");

const { render } = require("../../utils/render");

const injectAxe = async (page) => {
  const axeScriptLocation = [
    // evaluatory installed globally
    "../../../node_modules/axe-core/axe.min.js",

    // evaluatory installed as a local dependency
    "../../../../axe-core/axe.min.js",
  ]
    .map((location) => join(__dirname, location))
    .find((location) => existsSync(location));

  if (!axeScriptLocation) {
    logger.error("axe-core script not found.");
    return;
  }

  const axeScript = await readFile(axeScriptLocation, "utf8");

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
    // NOTE: axe-core additionally returns "needs review" items in axeResults.incomplete
    // Those items are currently not handled here.
    // More info: https://www.deque.com/axe/core-documentation/api-documentation/#results-object
  }

  // de-duplicate violations per breakpoint
  const violations = Object.entries(violationsPerDevice).reduce(
    (accumulator, [deviceName, deviceViolations]) => {
      deviceViolations.forEach((violation) => {
        const accumulatedViolation = _.find(
          accumulator,
          (value) => value.id === violation.id
        );
        if (!accumulatedViolation) {
          violation.breakpoints = [deviceName];
          violation.icon = `../../assets/icons/severity-${violation.impact}.svg`;
          accumulator.push(violation);
        } else {
          accumulatedViolation.breakpoints.push(deviceName);
          // add device-specific nodes
          violation.nodes.forEach((node) => {
            if (
              !_.find(
                accumulatedViolation.nodes,
                (accumulatedNode) =>
                  node.target.join("") === accumulatedNode.target.join("")
              )
            ) {
              accumulatedViolation.nodes.push(node);
            }
          });
        }
      });
      return accumulator;
    },
    []
  );

  const issueCount = violations.reduce(
    (accumulator, violation) => accumulator + violation.nodes.length,
    0
  );

  const jsonFileName = `${index}-${moduleName}.json`;
  await outputJson(join(config.output, jsonFileName), {
    violations,
  });
  const html = await render(join(__dirname, "template.njk"), {
    violations,
    issueCount,
    jsonFileName,
  });

  return { issueCount, html };
};
