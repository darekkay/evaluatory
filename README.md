# Evaluatory

![npm](https://img.shields.io/npm/v/evaluatory?style=flat-square)
[![Travis](https://img.shields.io/travis/com/darekkay/evaluatory?style=flat-square)](https://travis-ci.com/darekkay/evaluatory)
[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/darekkay/evaluatory/blob/master/LICENSE)

Web page evaluation with a focus on accessibility.

This project is an alternative to tools like [webhint](https://webhint.io). Its goal is to scan websites and provide useful feedback on things to improve. The main motivation is being able to run [axe-core](https://github.com/dequelabs/axe-core) at different breakpoints at the same time (e.g. mobile, tablet and desktop).

## Installation

This tool requires Node.js version 12+.

Install globally:

```bash
$ yarn add -g evaluatory     # Yarn
$ npm install -g evaluatory  # Npm
```

Or install as a local dependency:

```bash
$ yarn add evaluatory            # Yarn
$ npm install --save evaluatory  # Npm
```

Or use without installing:

```bash
$ npx evaluatory <file>
```

## Usage

View program help:

```
$ evaluatory --help
Usage: evaluatory [url] [options]

Arguments:
  [url]  URL                                                       [string]

Options:
  -c, --config   Configuration file path                           [string]
  -o, --output   Output folder                                     [string]
  -m, --modules  Modules to execute (comma-separated)              [string]
  --verbose      Verbose/debug mode                               [boolean]
  -h, --help     Show help                       [commands: help] [boolean]
  -v, --version  Show version number          [commands: version] [boolean]
```

Run default configuration for a single URL:

```bash
$ evaluatory https://example.com
```

Provide a custom configuration:

```bash
$ evaluatory -c config.json
```

## Configuration

The configuration is a valid JSON5 file. See [config.example.json5](config.example.json5) for an example (incl. option descriptions).

## License

This project and its contents are open source under the [MIT license](LICENSE).
