const hasResolvedAuthor = (author) =>
  Boolean(author?.username || author?.displayName);

export const resolveCommentAuthor = (author, viewerUsername = null) => {
  if (!author) {
    return {
      username: null,
      displayName: null,
      avatarUrl: "",
      isViewer: false,
    };
  }

  const username = author?.username || author?.userName || author?.handle || null;
  const displayName = author?.displayName || author?.fullName || username || null;

  return {
    username,
    displayName,
    avatarUrl: author?.avatarUrl || author?.avatar || author?.photoURL || "",
    isViewer: Boolean(viewerUsername && username && viewerUsername === username),
  };
};

export const resolveReplyAuthor = (
  replyTo,
  fallbackAuthor = null,
  viewerUsername = null
) => {
  if (replyTo) {
    const resolvedAuthor = resolveCommentAuthor(replyTo, viewerUsername);
    if (hasResolvedAuthor(resolvedAuthor)) {
      return resolvedAuthor;
    }
  }

  if (fallbackAuthor) {
    const resolvedFallbackAuthor = resolveCommentAuthor(fallbackAuthor, viewerUsername);
    if (hasResolvedAuthor(resolvedFallbackAuthor)) {
      return resolvedFallbackAuthor;
    }
  }

  return null;
};
