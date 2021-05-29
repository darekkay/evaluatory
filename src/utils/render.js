const { join } = require("path");

const { outputFile } = require("fs-extra");
const nunjucks = require("nunjucks");

const env = nunjucks.configure([join(__dirname, "..")], { autoescape: true });
require("./code-highlight")(env);

const render = (templatePath, options) => {
  return nunjucks.render(templatePath, options);
};

const renderToFile = async (templatePath, options, outputFilePath) => {
  const content = render(templatePath, options);
  await outputFile(outputFilePath, content);
};

module.exports = {
  render,
  renderToFile,
};
