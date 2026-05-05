import { normalizeFlatCommentTree } from "./commentNormalization.utils";

export const normalizeStoreComments = (items = [], viewerUsername = null) =>
  normalizeFlatCommentTree(items, { viewerUsername });