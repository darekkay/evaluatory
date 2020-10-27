# Evaluatory

[![npm](https://img.shields.io/npm/v/evaluatory?style=flat-square)](https://www.npmjs.com/package/evaluatory)
[![Travis](https://img.shields.io/travis/com/darekkay/evaluatory?style=flat-square)](https://travis-ci.com/darekkay/evaluatory)
[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/darekkay/evaluatory/blob/master/LICENSE)

Web page evaluation with a focus on accessibility.

Currently, it is mainly a wrapper around [axe-core](https://github.com/dequelabs/axe-core), which tests a website for accessibility issues. 
Evaluatory comes with two essential improvements:

- Run checks at multiple breakpoints at the same time (e.g. mobile, tablet and desktop). Some accessibility issues are only applicable to certain breakpoints.
- Provide a visual HTML results page.

This project uses a modular architecture, so in the long term it could become an alternative to tools like [webhint](https://webhint.io).

## Demo

Check out a demo results page at [https://darekkay.com/evaluatory/demo/](https://darekkay.com/evaluatory/demo/). 

## Installation

This tool requires Node.js version 12+.

Install globally:

```shell
$ yarn add -g evaluatory     # Yarn
$ npm install -g evaluatory  # Npm
```

Or install as a local dependency:

```shell
$ yarn add evaluatory            # Yarn
$ npm install --save evaluatory  # Npm
```

Or use without installing:

```shell
$ npx evaluatory <url>
```

## Usage

View program help:

```
$ evaluatory --help
Usage: evaluatory [url] [options]

Arguments:
  [url]  URL

Options:
  -c, --config       Configuration file path
  -o, --output       Output folder
  -m, --modules      Modules to execute (comma-separated)
  --no-open-results  Don't open the results page after evaluation
  --verbose          Verbose/debug mode
  -h, --help         Show help
  -v, --version      Show version number
```

Run default configuration for a single URL:

```shell
$ evaluatory https://example.com
```

Provide a custom configuration:

```shell
$ evaluatory -c config.json
```

## Configuration

The configuration is a valid JSON5 file. See [config.example.json5](config.example.json5) for an example (incl. option descriptions).

## License

This project and its contents are open source under the [MIT license](LICENSE).
