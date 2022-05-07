const { join } = require("path");

const { render } = require("../../utils/render");
const { getDocumentScrollWidth } = require("../../utils/playwright");

/** Base custom checks */
module.exports = async ({ page, moduleName, config }) => {
  const moduleConfig = config.modulesConfig[moduleName];
  const violations = [];

  for (const { name: deviceName, options: deviceOptions } of config.devices) {
    await page.setViewportSize(deviceOptions.viewport);

    if (moduleConfig["horizontal-content-overflow"]) {
      // check for horizontal overflows
      const documentScrollWidth = await getDocumentScrollWidth(page);
      if (documentScrollWidth > deviceOptions.viewport.width) {
        violations.push({
          icon: "icon-severity-moderate",
          title: `Horizontal content overflow on ${deviceName}`,
          description: `Device width: <strong>${deviceOptions.viewport.width}</strong>. Document scroll width: <strong>${documentScrollWidth}</strong>.`,
        });
      }
    }
  }

  const issueCount = violations.length;
  const html = render(join(__dirname, "template.njk"), {
    issueCount,
    violations,
  });
  return { issueCount, html };
};
