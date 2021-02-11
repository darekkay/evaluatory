const { join, resolve } = require("path");

const { webkit } = require("playwright");
const asyncPool = require("tiny-async-pool");
const { emptyDir, copy } = require("fs-extra");
const open = require("open");
const dayjs = require("dayjs");
const logger = require("@darekkay/logger");

const { renderToFile } = require("./utils/render");

const executeForSingleUrl = async ({ modules, url, ...parameters }) => {
  const resultsFileName = `${parameters.index}.html`;
  const htmlParts = [];
  let issueCount = 0;
  let browser;
  try {
    browser = await webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const response = await page.goto(url);
    const pageSource = await response.text();

    for (const module of modules) {
      // run all modules sequentially to prevent concurrency issues
      logger.info(`Running [${module.name}] for ${url}`);

      try {
        const moduleResults = await module.execute({
          ...parameters,
          moduleName: module.name,
          page,
          pageSource,
        });
        htmlParts.push(moduleResults.html);
        issueCount += moduleResults.issueCount;
      } catch (error) {
        logger.error(`Error executing module [${module.name}]`, error);
      }
    }

    await browser.close();

    // concatenate all HTML results into a single results file
    await renderToFile(
      join(__dirname, "templates", "module.njk"),
      { url, modules, results: htmlParts },
      join(parameters.config.output, `${parameters.index}.html`)
    );
  } catch (error) {
    logger.error(error);
    if (browser !== undefined) {
      await browser.close();
    }
  }
  return { fileName: resultsFileName, url, issueCount };
};

const execute = async (config) => {
  const modules = config.modules
    .map((moduleName) => {
      try {
        return {
          name: moduleName,
          execute: require(`./modules/${moduleName}/index`),
        };
      } catch (error) {
        logger.error(`Error loading module [${moduleName}].`, error);
        return null;
      }
    })
    .filter(Boolean);

  logger.info(
    `Evaluating ${config.urls.length} URL${config.urls.length > 1 ? "s" : ""}`
  );
  logger.info("Clearing output folder:", resolve(join(config.output)));
  await emptyDir(config.output);

  // limit the number of parallel connections using a promise pool
  const results = await asyncPool(
    config.maxConnections,
    config.urls.reduce(
      (accumulator, url, index) => [
        ...accumulator,
        {
          url,
          index: index + 1,
          config,
          modules,
        },
      ],
      []
    ),
    executeForSingleUrl
  );

  // group results by fail/success

  const groupedResults = results.reduce(
    (accumulator, result) => {
      if (result.issueCount > 0) {
        accumulator.fail.push(result);
      } else {
        accumulator.success.push(result);
      }
      return accumulator;
    },
    { fail: [], success: [] }
  );

  const totalIssueCount = results.reduce(
    (accumulator, result) => accumulator + result.issueCount,
    0
  );

  // create an index file
  await renderToFile(
    join(__dirname, "templates", "index.njk"),
    {
      results: groupedResults,
      totalUrlCount: config.urls.length,
      totalIssueCount,
      lastGenerated: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
    join(config.output, "index.html")
  );

  // copy static assets
  await copy(join(__dirname, "assets", "dist"), join(config.output, "assets"));

  logger.info(`Saved results to: ${resolve(config.output)}`);

  if (totalIssueCount === 0) {
    logger.success(`Finished evaluation: no issues found.`);
  } else {
    logger.error(`Finished evaluation: ${totalIssueCount} issues found.`);
  }

  if (config.openResults) {
    await open(join(config.output, "index.html"));
  }

  return { totalIssueCount };
};

module.exports = execute;
