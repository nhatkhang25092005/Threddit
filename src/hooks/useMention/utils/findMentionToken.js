import { isValidMentionChar } from "./isValidMentionChar";
export function findMentionToken(text, caretIndex) {
  let cursor = caretIndex - 1;

  while (cursor >= 0) {
    const char = text[cursor];

    if (char === "@") {
      const previousChar = text[cursor - 1];
      if (previousChar && isValidMentionChar(previousChar)) return null;
      return { start: cursor, end: caretIndex };
    }

    if (/\s/.test(char)) return null;
    cursor -= 1;
  }

  return null;
}