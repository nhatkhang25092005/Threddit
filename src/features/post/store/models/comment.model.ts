import { mediaModel } from "./media.model";
import type {
  RawCommentInput,
  ExpectCommenterInput,
  Comment,
} from "../../types/comment.type";
import type { Author } from "../../types/author.interface";
import {
  resolveString,
  resolveNumber,
  resolveBoolean,
  resolveArray,
  resolveId,
  resolveReaction
} from "../../utils/resolveTypes";

import type { Media } from "../../types/media.type";
import { Reaction } from "../../types/reaction.type";
const mapCommenter = (commenter: ExpectCommenterInput):Author => {
  if (!commenter) return {
    username:'unknown',
    displayName:'unknown',
    avatarUrl: null
  }

  return {
    username: resolveString(commenter.username) || 'unknown',
    displayName: resolveString(commenter.displayName) || 'unknown',
    avatarUrl: resolveString(commenter?.avatarUrl) ? `${commenter.avatarUrl}?t=${Date.now()}` : null,
  };
};

function refined(rawComment:RawCommentInput): Comment {
  const isMedia = (item:unknown): item is Media =>
    typeof item === 'object' &&
    item !== null &&
    'url' in item
  
  const isString = (item:unknown): item is string =>
    typeof item ===  'string' &&
    item !== null
  
  return{
    id:resolveId(rawComment?.id),
    text:resolveString(rawComment?.text) || '',
    createdAt:resolveString(rawComment.createdAt) || null,
    updatedAt: resolveString(rawComment.updatedAt) || null,
    commenter:mapCommenter(rawComment.commenter),
    isCommenter:resolveBoolean(rawComment.isCommenter),
    parentCommenter:resolveString(rawComment.parentCommenter) || 'unknown',
    parentCommentId:resolveId(rawComment.parentCommentId),
    hasChildComment:resolveBoolean(rawComment.hasChildComment),
    reaction:resolveReaction(rawComment.reaction),
    mediaFiles:resolveArray(rawComment.mediaFiles,isMedia),
    mentionedUsers:resolveArray(rawComment.mentionedUsers, isString),
    reactionNumber:resolveNumber(rawComment?.reactionNumber ?? rawComment?.stats?.reactionNumber)
  }
}

export const commentModel = (comment: RawCommentInput):Comment => {
  const mediaFiles = Array.isArray(comment?.mediaFiles)
    ? comment.mediaFiles
    : (Array.isArray(comment?.media) ? comment.media : [])
  const refinedComment = refined(comment)
  
  return {
    id: refinedComment.id,
    text: refinedComment.text,
    createdAt: refinedComment.createdAt,
    updatedAt: refinedComment.updatedAt,
    commenter: refinedComment.commenter,
    isCommenter: refinedComment.isCommenter,
    parentCommentId: refinedComment.parentCommentId,
    hasChildComment: refinedComment.hasChildComment,
    parentCommenter:refinedComment.parentCommenter,
    reaction: refinedComment.reaction,
    reactionNumber: refinedComment.reactionNumber,
    mediaFiles: mediaFiles.map((item) => mediaModel(item)),
    mentionedUsers: Array.isArray(refinedComment?.mentionedUsers) ? refinedComment.mentionedUsers : [],
  }
};