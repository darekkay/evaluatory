# Changelog

## [Unreleased]

- :boom: Drop Node 14 support.
- :rocket: Disable `axe-core` "landmark-complementary-is-top-level" rule by default as it's [buggy](https://github.com/dequelabs/axe-core/issues/3586).
- :hammer: Simplify GitHub CI.

## [2.3.1] - 2022-09-28

- :bug: Make severity icons accessible.

## [2.3.0] - 2022-07-13

- :gem: Fix line breaks in long URLs.
- :gem: Make error color accessible on offset background.
- :hammer: Update dependencies.

## [2.2.0] - 2022-05-07

- :sparkles: Add new `base` module.
- :sparkles: Check for horizontal content overflows (`base` module).

## [2.1.2] - 2022-02-03

- :bug: Fix parsing sitemaps.

## [2.1.1] - 2022-01-22

- :gem: Add dark mode (derived from browser/system settings).

## [2.1.0] - 2022-01-22

- :sparkles: Provide custom CLI config option to run checks in dark mode.

## [2.0.0] - 2022-01-22

- :sparkles: Support custom Playwright options, e.g. to emulate a dark color scheme.
- :hammer: **(Breaking Change)** Drop Node 12 support.
- :hammer: Update dependencies.

## [1.7.1] - 2021-12-09

- :hammer: Update dependencies.

## [1.7.0] - 2021-04-21

- :sparkles: Make the browser configurable (Chromium, Firefox or Webkit).
- :rocket: Use Chromium browser as default instead of Webkit. Webkit doesn't work for around 5% of tested pages (page timeout).
- :hammer: Update dependencies.

## [1.6.0] - 2021-02-27

- :rocket: Add `handleHttpErrorCodes` option to handle HTTP status codes above 400 as errors.
- :rocket: Handle request errors.
- :rocket: Display module versions.
- :gem: Deemphasize the success/failure count.
- :hammer: Update dependencies.

## [1.5.4] - 2021-02-13

- :rocket: Add result count.
- :rocket: Include tested URL in page title.

## [1.5.3] - 2021-02-09

- :rocket: Provide even more sane defaults for `html-validate`.

## [1.5.2] - 2021-02-07

- :rocket: Provide sane defaults for `html-validate`.

## [1.5.1] - 2021-02-06

- :rocket: Add `html-validate` to default modules.

## [1.5.0] - 2021-02-06

- :sparkles: Add `html-validate` module for HTML validation.
- :rocket: Separate failed from successful results.
- :rocket: Add option `shouldFailOnIssue` to use exit status 1 in case of any error or validation issue (useful for CI environments).
- :rocket: Add a table of contents to the result page.
- :rocket: Display total number of issues in CLI.
- :rocket: Use a consistent date format.

## [1.4.3] - 2021-01-19

- :gem: Update anchor links.

## [1.4.2] - 2021-01-14

- :rocket: Add anchor links to the result page.

## [1.4.1] - 2021-01-14

- :gem: Update design.
- :hammer: Update internal dependencies.

## [1.4.0] - 2020-11-21

- :bug: List all `axe-core` violation occurrences.
- :hammer: Replace TravisCI with GitHub Actions.

## [1.3.1] - 2020-10-28

- :rocket: Add basic responsive design for the results table.

## [1.3.0] - 2020-10-28

- :sparkles: Add sitemap support.
- :rocket: Include a favicon.

## [1.2.1] - 2020-10-27

- :rocket: Make evaluatory pages fully accessible.
- :book: Include project documentation and a demo page.

## [1.2.0] - 2020-10-26

- :sparkles: Automatically open results in the default browser.
- :rocket: Make code sections focusable.

## [1.1.0] - 2020-10-25

- :bug: Fix paths to `axe-core` and nunjucks templates.

## [1.0.0] - 2020-10-25

- :tada: Initial release.

[unreleased]: https://github.com/darekkay/evaluatory/compare/2.3.1...HEAD
[2.3.1]: https://github.com/darekkay/evaluatory/compare/2.3.0...2.3.1
[2.3.0]: https://github.com/darekkay/evaluatory/compare/2.2.0...2.3.0
[2.2.0]: https://github.com/darekkay/evaluatory/compare/2.1.2...2.2.0
[2.1.2]: https://github.com/darekkay/evaluatory/compare/2.1.1...2.1.2
[2.1.1]: https://github.com/darekkay/evaluatory/compare/2.1.0...2.1.1
[2.1.0]: https://github.com/darekkay/evaluatory/compare/2.0.0...2.1.0
[2.0.0]: https://github.com/darekkay/evaluatory/compare/1.7.1...2.0.0
[1.7.1]: https://github.com/darekkay/evaluatory/compare/1.7.0...1.7.1
[1.7.0]: https://github.com/darekkay/evaluatory/compare/1.6.0...1.7.0
[1.6.0]: https://github.com/darekkay/evaluatory/compare/1.5.4...1.6.0
[1.5.4]: https://github.com/darekkay/evaluatory/compare/1.5.3...1.5.4
[1.5.3]: https://github.com/darekkay/evaluatory/compare/1.5.2...1.5.3
[1.5.2]: https://github.com/darekkay/evaluatory/compare/1.5.1...1.5.2
[1.5.1]: https://github.com/darekkay/evaluatory/compare/1.5.0...1.5.1
[1.5.0]: https://github.com/darekkay/evaluatory/compare/1.4.3...1.5.0
[1.4.3]: https://github.com/darekkay/evaluatory/compare/1.4.2...1.4.3
[1.4.2]: https://github.com/darekkay/evaluatory/compare/1.4.1...1.4.2
[1.4.1]: https://github.com/darekkay/evaluatory/compare/1.4.0...1.4.1
[1.4.0]: https://github.com/darekkay/evaluatory/compare/1.3.1...1.4.0
[1.3.1]: https://github.com/darekkay/evaluatory/compare/1.3.0...1.3.1
[1.3.0]: https://github.com/darekkay/evaluatory/compare/1.2.1...1.3.0
[1.2.1]: https://github.com/darekkay/evaluatory/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/darekkay/evaluatory/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/darekkay/evaluatory/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/darekkay/evaluatory/compare/tag/1.0.0
