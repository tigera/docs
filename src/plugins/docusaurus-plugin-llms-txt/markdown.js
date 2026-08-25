/**
 * Shared Markdown text utilities.
 */

/**
 * Walk a Markdown document line by line, applying `fn` only outside fenced code.
 *
 * Both callers need this and neither can afford to get it wrong: a `#` inside a
 * shell sample is a comment, and a URL inside a YAML sample is not a link. Keeping
 * one implementation means the two cannot drift.
 *
 * @param {string} markdown
 * @param {(line: string) => string} fn
 * @returns {string}
 */
export function mapNonFencedLines(markdown, fn) {
  const lines = markdown.split('\n');
  let openFence = null;

  for (let i = 0; i < lines.length; i++) {
    const fenceMatch = lines[i].match(/^\s*((`{3,})|(~{3,}))(.*)$/);

    if (fenceMatch) {
      const marker = fenceMatch[1];
      const info = fenceMatch[4].trim();

      if (openFence === null) {
        // An opening fence may carry an info string: ```bash
        openFence = { char: marker[0], length: marker.length };
        continue;
      }

      // A closing fence must use the same character, be at least as long as the
      // opener, and carry no info string. A line like ```bash therefore cannot
      // close anything — inside an open fence it is ordinary content. Treating it
      // as a close desynchronises the tracker for the rest of the document, which
      // silently skips every heading and link after it.
      const closes =
        marker[0] === openFence.char && marker.length >= openFence.length && info === '';

      if (closes) {
        openFence = null;
      }

      continue;
    }

    if (openFence === null) {
      lines[i] = fn(lines[i]);
    }
  }

  return lines.join('\n');
}

/**
 * Shift every ATX heading in a Markdown body down by `delta` levels, capped at h6.
 *
 * Page bodies come out of the converter with `##` as their top level, because the
 * page <h1> lives in the `<header>` we strip and is carried as metadata instead.
 * Nesting such a body under a doc-title heading inverts the hierarchy unless the
 * body is shifted to match.
 *
 * @param {string} markdown
 * @param {number} delta
 * @returns {string}
 */
export function shiftHeadings(markdown, delta) {
  if (delta <= 0) {
    return markdown;
  }

  return mapNonFencedLines(markdown, (line) => {
    const headingMatch = line.match(/^(#{1,6})(\s)/);
    if (!headingMatch) {
      return line;
    }

    const level = Math.min(6, headingMatch[1].length + delta);
    return '#'.repeat(level) + line.slice(headingMatch[1].length);
  });
}
