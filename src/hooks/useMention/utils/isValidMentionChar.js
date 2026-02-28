import { MENTION_CHAR_REGEX } from "../const";
export const isValidMentionChar = (char) => MENTION_CHAR_REGEX.test(char);