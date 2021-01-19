const { applySharedConfig, markdown } = require("@darekkay/11ty");

module.exports = function (config) {
  applySharedConfig(config);

  // markdown setup
  const markdownLib = markdown
    .markdownIt({
      html: true,
      highlight: markdown.highlight(),
    })
    .use(...markdown.pluginStripH1())
    .use(...markdown.pluginRelativeGitHubLinks())
    .use(
      ...markdown.pluginHeadlineAnchors({
        spriteUrl: "./assets/icons/sprite.svg"
      })
    );
  config.setLibrary("md", markdownLib);

  // copy assets
  config.addPassthroughCopy({ "src/assets/dist/": "assets/" });

  return {
    pathPrefix: "/evaluatory/",
    dir: {
      input: "README.md",
      output: "docs",
      includes: "node_modules/@darekkay/11ty/lib/includes",
      layouts: "node_modules/@darekkay/11ty/lib/layouts",
    },
  };
};
