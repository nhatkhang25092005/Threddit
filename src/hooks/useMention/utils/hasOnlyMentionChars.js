import { isValidMentionChar } from "./isValidMentionChar";
export const hasOnlyMentionChars = (value) =>
  [...value].every((char) => isValidMentionChar(char))