const { renderToHtml, getHighlighter } = require('shiki');

let bashHighlighter;
let yamlHighlighter;
let groovyHighlighter;

async function highlight(code, theme, lang) {
  if (!bashHighlighter) {
    bashHighlighter = await getHighlighter({
      langs: ['bash'],
      theme: theme
    });
  }

  if (!yamlHighlighter) {
    yamlHighlighter = await getHighlighter({
      langs: ['yaml'],
      theme: theme
    });
  }

  if (!groovyHighlighter) {
    groovyHighlighter = await getHighlighter({
      langs: ['groovy'],
      theme: theme
    });
  }

  if(lang === 'yaml') {
    const tokens = yamlHighlighter.codeToThemedTokens(code, lang, theme, {
      includeExplanation: false
    });

    const html = renderToHtml(tokens, { bg: 'transparent' });

    return html;
  }

  if(lang === 'bash') {
    const tokens = bashHighlighter.codeToThemedTokens(code, lang, theme, {
      includeExplanation: false
    });

    const html = renderToHtml(tokens, { bg: 'transparent' });

    return html;
  }

  if(lang === 'groovy') {
    const tokens = groovyHighlighter.codeToThemedTokens(code, lang, theme, {
      includeExplanation: false
    });

    const html = renderToHtml(tokens, { bg: 'transparent' });

    return html;
  }

  return html;
}

module.exports = { highlight };
