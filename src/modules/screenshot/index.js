const { join } = require("path");

const { render } = require("../../utils/render");

/** Module to take a screenshot per specified breakpoint */
module.exports = async ({ page, moduleName, index, config }) => {
  const images = [];

  for (const { name: deviceName, options: deviceOptions } of config.devices) {
    await page.setViewportSize(deviceOptions.viewport);
    await page.screenshot({
      path: join(config.output, `${index}-${moduleName}-${deviceName}.png`),
    });
    images.push({
      src: `${index}-${moduleName}-${deviceName}.png`,
      breakpoint: deviceName,
    });
  }

  const html = render(join(__dirname, "template.njk"), { images });

  return { issueCount: 0, html };
};
