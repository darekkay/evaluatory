const { join } = require("path");

const logger = require("@darekkay/logger");

const getConfig = require("../config");
const defaultConfig = require("../../config.default");

describe("config", () => {
  afterEach(() => {
    logger.setLevel("error");
  });

  test("returns the default config if no config file is specified", async () => {
    await expect(getConfig()).resolves.toEqual(defaultConfig);
  });

  test("user config overrides default config", async () => {
    await expect(
      getConfig({ config: join(__dirname, "test-config.json") }),
    ).resolves.toEqual({
      ...defaultConfig,
      maxConnections: 1,
      modules: ["pa11y"],
    });
  });

  test("cli argument overrides user config", async () => {
    await expect(
      getConfig({
        config: join(__dirname, "test-config.json"),
        modules: "axe-core",
      }),
    ).resolves.toEqual({
      ...defaultConfig,
      maxConnections: 1,
      modules: ["axe-core"],
    });
  });

  test("returns the default config if the specified config file doesn't exist", async () => {
    logger.setLevel("silent");
    await expect(
      getConfig({
        config: join(__dirname, "nonexisting-config.json"),
      }),
    ).resolves.toEqual(defaultConfig);
  });
});
