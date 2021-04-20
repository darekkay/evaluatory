#!/usr/bin/env node
const logger = require("@darekkay/logger");

const execute = require("../src/index");
const { cli, enhance } = require("../src/utils/cli");
const getConfig = require("../src/utils/config");

cli
  .string("-c, --config", { desc: "Configuration file path" })
  .string("-o, --output", { desc: "Output folder" })
  .string("--sitemap", { desc: "Sitemap URL" })
  .string("-m, --modules", { desc: "Modules to execute (comma-separated)" })
  .boolean("--no-open-results", {
    desc: "Don't open the results page after evaluation",
  })
  .boolean("--verbose", { desc: "Verbose/debug mode" })
  .positional("[url]", { paramsDesc: "URL", optional: true });

enhance(cli);

async function main() {
  const cliArguments = await cli.parseAndExit();

  logger.setLevel(cliArguments.verbose ? "debug" : "info");

  const config = await getConfig(cliArguments);

  logger.debug("Config", config);

  if (!config.modules.length) {
    throw new Error("Specify modules to execute.");
  }

  if (!config.urls.length) {
    throw new Error("Specify URLs to evaluate.");
  }

  let isFailure = false;

  try {
    const { totalIssueCount } = await execute(config);
    if (totalIssueCount > 0) {
      isFailure = true;
    }
  } catch (error) {
    logger.error(error);
    isFailure = true;
  }

  if (config.shouldFailOnIssue && isFailure) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((error) => {
    logger.error(error);
    process.exit(1);
  });
}
