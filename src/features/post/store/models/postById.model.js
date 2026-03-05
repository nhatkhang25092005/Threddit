import { mediaModel } from "./media.model"
function mapAuthor(author){
  return author !== null
  ? {
      username: author?.username || null,
      displayName: author?.displayName || null,
      avatarUrl: author?.avatarUrl || null,
    }
  : null
}

function mapSharer(sharer){
  return sharer !== null
  ? {
      username:sharer?.username || null,
      displayName:sharer?.displayName || null,
      avatarUrl:sharer?.avatarUrl || null
    }
  : null
}

export const postByIdModel = (data) => ({
  id: data.contentId || data.id,

  time:{
    createdAt:data.createdAt || null,
    updatedAt:data.updatedAt || null,
    sharedAt:data.sharedAt || null
  },

  isPinned:data.isPinned || false,
  text: data.text || "",

  type:data.type || 'post',

  author: mapAuthor(data.author),
  sharer:mapSharer(data.sharer) ,

  isOwner:data.isOwner,
  mentionedUsers: data.mentionedUsers || [],


  mediaFiles: Array.isArray(data?.mediaFiles)
    ? data.mediaFiles.map((item) => mediaModel(item))
    : [],

  stats: {
    commentNumber: data.commentNumber ?? 0,
    saveNumber: data.saveNumber ?? 0,
    shareNumber: data.shareNumber ?? 0,
    reactionNumber: data.reactionNumber ?? 0,
  },

  viewer: {
    isSaved: data.isSaved || false,
    reaction: data.reaction || null,
    isShared:data.isShared || false,
    shareMessage:data.shareMessage || null
  },

  shareId:data.shareId || null
})
