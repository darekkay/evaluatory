# Evaluatory

[![npm](https://img.shields.io/npm/v/evaluatory?style=flat-square)](https://www.npmjs.com/package/evaluatory)
[![Build](https://img.shields.io/github/workflow/status/darekkay/evaluatory/Continuous%20Integration/master?style=flat-square)](https://github.com/darekkay/evaluatory/actions)
[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/darekkay/evaluatory/blob/master/LICENSE)

Evaluatory is an [open-source](https://github.com/darekkay/evaluatory) tool for website validation. It is mainly a wrapper around [axe-core](https://github.com/dequelabs/axe-core) and [html-validate](https://html-validate.org), which test a website for accessibility and markup issues.

Evaluatory comes with some essential improvements:

- Run checks at **multiple device breakpoints** at the same time (e.g. mobile, tablet and desktop). Some accessibility issues appear only at a certain breakpoint.
- Emulate **dark mode**, disabled JavaScript, offline mode and more by using [custom Playwright options](https://playwright.dev/docs/api/class-browser#browser-new-context).
- Return a **visual HTML results page**, including page screenshots.
- Support for **sitemaps** to check all referenced web pages at once.

This project uses a modular architecture, so in the long term it could become an alternative to tools like [webhint](https://webhint.io).

## Demo

Check out a demo results page at [https://darekkay.com/evaluatory/demo/](https://darekkay.com/evaluatory/demo/).

## Modules

- **axe-core**: Checks for accessibility issues using [axe-core](https://github.com/dequelabs/axe-core).
- **html-validate**: Validates the HTML using [html-validate](https://html-validate.org).
- **screenshot**: Takes a screenshot of the page.

## Quickstart

Run evaluatory with [default configuration](https://github.com/darekkay/evaluatory/blob/master/src/config.default.js) for a single URL:

```shell
npx evaluatory https://example.com
```

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

```text
$ evaluatory --help
Usage: evaluatory [url] [options]

Arguments:
  [url]  URL

Options:
  -c, --config       Configuration file path
  -o, --output       Output folder
  --sitemap          Sitemap URL
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

Run default configuration for all URLs within a sitemap:

```shell
$ evaluatory --sitemap https://example.com/sitemap.xml
```

Provide a custom configuration:

```shell
$ evaluatory -c config.json
```

## Configuration

The configuration is a valid JSON5 file. See [config.example.json5](https://github.com/darekkay/evaluatory/blob/master/config.example.json5) for an example and [config.default.js](https://github.com/darekkay/evaluatory/blob/master/src/config.default.js) for available options (with defaults).

## License

This project and its contents are open source under the [MIT license](LICENSE).
