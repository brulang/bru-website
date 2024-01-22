const { renderToHtml, getHighlighter } = require('shiki');
const vitesseTheme = require('./vitesse-light-theme.json');

let highligher;

async function highlight(code, theme, lang) {
  if (!highligher) {
    highligher = await getHighlighter({
      langs: ['bash'],
      theme: vitesseTheme
    });
  }

  const tokens = highligher.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false
  });

  const html = renderToHtml(tokens, { bg: 'transparent' });

  return html;
}

module.exports = { highlight };
