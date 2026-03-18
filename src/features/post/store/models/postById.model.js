import { mediaModel } from "./media.model"
function mapAuthor(author){
  return author !== null
  ? {
      username: author?.username || null,
      displayName: author?.displayName || null,
      avatarUrl: author?.avatarUrl+'?t='+Date.now() || null,
    }
  : null
}

function mapSharer(sharer){
  return sharer !== null
  ? {
      username:sharer?.username || null,
      displayName:sharer?.displayName || null,
      avatarUrl:sharer?.avatarUrl+'?t='+Date.now()|| null
    }
  : null
}

export const postByIdModel = (data = {}) => {
  const mediaFiles = Array.isArray(data?.mediaFiles)
    ? data.mediaFiles
    : (Array.isArray(data?.media) ? data.media : [])

  return {
    id: data.contentId || data.id,
    context : null,
    time:{
      createdAt:data.createdAt || data.contentCreatedAt || null,
      updatedAt:data.updatedAt || data.contentUpdatedAt || null,
      sharedAt:data.sharedAt || null
    },

    isPinned:data.isPinned || false,
    text: data.text || "",

    type:data.type || 'post',

    author: mapAuthor(data.author),
    sharer:mapSharer(data.sharer) ,

    isOwner:data.isOwner,
    mentionedUsers: data.mentionedUsers || [],


    mediaFiles: mediaFiles.map((item) => mediaModel(item)),

    stats: {
      commentNumber: data.commentNumber ?? 0,
      saveNumber: data.saveNumber ?? 0,
      shareNumber: data.shareNumber ?? 0,
      reactionNumber: data.reactionNumber ?? 0,
    },

    viewer: {
      isSaved: data.isSaved || false,
      reaction: data.reaction || null,
      isShare: Boolean(data.isShare ?? data.isShared),
      isShared: Boolean(data.isShared ?? data.isShare),
      shareMessage:data.shareMessage || null
    },

    shareId:data.shareId || null
  }
}
