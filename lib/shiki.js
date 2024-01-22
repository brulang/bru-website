import * as fs from "fs/promises"

const path = require('path');
const { renderToHtml, getHighlighter } = require('shiki');;

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = () => {
	return path.join(process.cwd(), "lib/shiki");
}

const touched = { current: false };

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = () => {
	if (touched.current) return; // only need to do once
	fs.readdir(getShikiPath()); // fire and forget
	touched.current = true;
};

let highligher;

async function highlight(code, theme, lang) {
  touchShikiPath();

  if (!highligher) {
    highligher = await getHighlighter({
      langs: [lang],
      theme: theme,
      paths: {
        languages: `${getShikiPath()}/languages/`,
        themes: `${getShikiPath()}/themes/`,
      },
    });
  }

  const tokens = highligher.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false
  });

  const html = renderToHtml(tokens, { bg: 'transparent' });

  return html;
}

module.exports = { highlight };
