module.exports = {
  getDocumentScrollWidth: (page) =>
    // eslint-disable-next-line no-undef
    page.evaluate(() => window.document.documentElement.scrollWidth, {}),
};
