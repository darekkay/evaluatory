const {
  runtime: { SafeString },
} = require("nunjucks");
const { highlightAuto } = require("highlight.js");

/* Based on https://github.com/joncasey/nunjucks-extension-code-highlight */
class NunjucksExtension {
  constructor(options = {}) {
    const { langs, tag, wrap } = options;
    this.langs = langs || ["html", "xml", "css", "scss", "javascript"];
    this.tags = [tag || "code"];
    if (wrap) this.wrap = wrap;
  }

  parse(parser, nodes) {
    const [tag] = this.tags;
    const tok = parser.nextToken();

    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    const body = parser.parseUntilBlocks(tag, `end${tag}`);
    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, "run", args, [body]);
  }

  run(...a) {
    if (a.length === 2) a.splice(1, 0, "");
    // eslint-disable-next-line prefer-const
    let [, lang, body] = a;
    let code;
    if (lang) {
      code = highlightAuto(body(), [(lang = lang.toLowerCase())]);
    } else {
      code = highlightAuto(body(), this.langs);
      lang = code.language;
    }
    return new SafeString(
      this.wrap(`<code class="language-${lang}">${code.value}</code>`)
    );
  }

  wrap(html) {
    return `<pre class="hljs">${html}</pre>`;
  }
}

module.exports = (env, options) =>
  env.addExtension("code-highlight", new NunjucksExtension(options));
