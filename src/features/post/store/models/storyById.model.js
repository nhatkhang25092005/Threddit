import { mediaModel } from "./media.model";

function mapAuthor(author) {
  if (!author) return null;

  return {
    username: author?.username || null,
    displayName: author?.displayName || null,
    avatarUrl: author?.avatarUrl ? `${author.avatarUrl}?t=${Date.now()}` : null,
  };
}

export const storyByIdModel = (story = {}) => ({
  id: story?.contentId ?? story?.id ?? null,
  context: null,
  time: {
    createdAt: story?.createdAt || story?.contentCreatedAt || null,
    updatedAt: story?.updatedAt || story?.contentUpdatedAt || null,
    sharedAt: story?.sharedAt || null,
  },

  isPinned: Boolean(story?.isPinned),
  text: story?.text || "",
  type: story?.type || "story",

  author: mapAuthor(story?.author),
  sharer: null,

  isOwner: Boolean(story?.isOwner),
  mentionedUsers: Array.isArray(story?.mentionedUsers) ? story.mentionedUsers : [],

  mediaFiles: Array.isArray(story?.mediaFiles)
    ? story.mediaFiles.map((item) => mediaModel(item))
    : [],

  stats: {
    commentNumber: story?.commentNumber ?? 0,
    saveNumber: story?.saveNumber ?? 0,
    shareNumber: story?.shareNumber ?? 0,
    reactionNumber: story?.reactionNumber ?? 0,
  },

  viewer: {
    isSaved: Boolean(story?.isSaved),
    reaction: story?.reaction || null,
    isShared: Boolean(story?.isShared),
    shareMessage: story?.shareMessage || null,
  },

  shareId: story?.shareId || null,
});

