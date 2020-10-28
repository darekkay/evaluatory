const markdownIt = require("markdown-it");
const markdown = require("@darekkay/11ty/lib/markdown");

module.exports = function(eleventyConfig) {

  // markdown setup
  const markdownLib = markdownIt({
    html: true,
    highlight: markdown.highlight()
  })
    .use(...markdown.pluginStripH1())
    .use(...markdown.pluginExternalLinks())
    .use(...markdown.pluginRelativeGitHubLinks())
    .use(...markdown.pluginHeadlineAnchors());
  eleventyConfig.setLibrary("md", markdownLib);

  // copy assets
  eleventyConfig.addPassthroughCopy({ "node_modules/@darekkay/styles/dist/css/styles.css": "assets/styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/src/assets/favicon.ico": "assets/favicon.ico" });

  return {
    dir: {
      input: "README.md",
      output: "docs",
      includes: "node_modules/@darekkay/11ty/lib/includes"
    }
  };
};
