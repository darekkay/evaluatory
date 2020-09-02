const cli = require("sywac");
const { white, green, yellow, cyan, red, gray } = require("kleur");

// TODO: extract into a separate package
// TODO: afterwards, remove direct kleur dependency

const enhance = (cliInstance) => {
  cliInstance
    .help("-h, --help")
    .version("-v, --version")
    .outputSettings({ maxWidth: 75 })
    .style({
      usagePrefix: (string) =>
        `${yellow(string.slice(0, 6))} ${green(string.slice(7))}`,
      group: (string) => yellow(string),
      desc: (string) => cyan(string),
      hints: (string) => gray(string),
      flags: (string) => white(string),
      flagsError: (string) => red(string),
      messages: (string) => red(string),
    });
};

module.exports = {
  cli,
  enhance,
};
