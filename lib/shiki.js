const { renderToHtml, getHighlighter } = require('shiki');

let highlighter;

async function highlight(code, theme, lang) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      theme: theme
    });
  }

  const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false
  });

  const html = renderToHtml(tokens, { bg: 'transparent' });

  return html;
}

module.exports = { highlight };
