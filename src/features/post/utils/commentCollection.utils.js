export const resolveCommentItems = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.commentList)) return data.commentList;
  if (Array.isArray(data?.comments)) return data.comments;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export const resolveCommentCursor = (data) =>
  data?.cursor ?? data?.nextCursor ?? data?.pagination?.cursor ?? null;

export const resolveCommentHasMore = (data, cursor, items = []) => {
  if (typeof data?.hasMore === "boolean") return data.hasMore;
  if (typeof data?.nextPage === "boolean") return data.nextPage;
  if (typeof data?.pagination?.hasMore === "boolean") return data.pagination.hasMore;
  return Boolean(cursor && items.length > 0);
};

export const buildSubCommentsMap = (comments = [], parentCommentId = null) => {
  const hasRootParent = parentCommentId != null;
  const rootKey = hasRootParent ? String(parentCommentId) : null;

  const mappedComments = (Array.isArray(comments) ? comments : []).reduce((result, comment) => {
    const currentParentCommentId = comment?.parentCommentId;
    if (currentParentCommentId == null || comment?.id == null) return result;

    const parentKey = String(currentParentCommentId);
    if (!Array.isArray(result[parentKey])) {
      result[parentKey] = [];
    }

    result[parentKey].push(comment.id);
    return result;
  }, {});

  if (hasRootParent && !Object.prototype.hasOwnProperty.call(mappedComments, rootKey)) {
    mappedComments[rootKey] = [];
  }

  return mappedComments;
};

export const buildEmptyCommentPage = (cursor = null) => ({
  success: true,
  data: {
    commentList: [],
    cursor,
    hasMore: false,
  },
});
