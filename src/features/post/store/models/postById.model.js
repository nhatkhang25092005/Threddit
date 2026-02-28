export const postByIdModel = (data) => ({
  contentId: data.contentId,

  author: {
    username: data.author?.username || null,
    displayName: data.author?.displayName || null,
    avatarUrl: data.author?.avatarUrl || null,
  },

  text: data.text || "",
  mediaFiles: data.mediaFiles || [],
  contentType: data.contentType || "post",

  mentionedUsers: data.mentionedUsers || [],

  createdAt: data.contentCreatedAt || null,
  updatedAt: data.contentUpdatedAt || null,

  stats: {
    commentNumber: data.commentNumber ?? 0,
    saveNumber: data.saveNumber ?? 0,
    shareNumber: data.shareNumber ?? 0,
    reactionNumber: data.reactionNumber ?? 0,
  },

  viewer: {
    isSaved: data.isSaved || false,
    reaction: data.reaction || null,
  }
})