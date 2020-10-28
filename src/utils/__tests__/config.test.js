const { join } = require("path");

const logger = require("@darekkay/logger");

const getConfig = require("../config");
const defaultConfig = require("../../config.default");

describe("config", () => {
  afterEach(() => {
    logger.setLevel("error");
  });

  test("returns the default config if no config file is specified", async () => {
    expect(await getConfig()).toEqual(defaultConfig);
  });

  test("user config overrides default config", async () => {
    expect(
      await getConfig({ config: join(__dirname, "test-config.json") })
    ).toEqual({
      ...defaultConfig,
      maxConnections: 1,
      modules: ["pa11y"],
    });
  });

  test("cli argument overrides user config", async () => {
    expect(
      await getConfig({
        config: join(__dirname, "test-config.json"),
        modules: "axe-core",
      })
    ).toEqual({
      ...defaultConfig,
      maxConnections: 1,
      modules: ["axe-core"],
    });
  });

  test("returns the default config if the specified config file doesn't exist", async () => {
    logger.setLevel("silent");
    expect(
      await getConfig({
        config: join(__dirname, "nonexisting-config.json"),
      })
    ).toEqual(defaultConfig);
  });
});
