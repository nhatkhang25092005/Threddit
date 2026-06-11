import { handleRequest } from "../../../api/helper";
import { commentApi } from "../../../api/content/comments/comment.api";
import { storageService } from "./storage.service";

const normalizeMediaList = (media = []) => (
  (Array.isArray(media) ? media : [])
    .filter((item) => item?.file)
    .slice(0, 1)
)

const buildCreatePayload = (data = {}, uploadSessionId = null) => {
  const payload = {};
  const text = String(data?.text ?? "").trim();
  const mentionedUsers = Array.isArray(data?.mentionedUsers) ? data.mentionedUsers.filter(Boolean) : [];

  if (text) payload.text = text;
  if (mentionedUsers.length > 0) payload.mentionedUsers = mentionedUsers;
  if (uploadSessionId) payload.uploadSessionId = uploadSessionId;
  if (data?.parentCommentId != null) payload.parentCommentId = data.parentCommentId;

  return payload;
};

export const commentService = {
  getCommentList: async (postId, cursor, signal) =>
    handleRequest(() => commentApi.getCommentOf(postId, cursor, signal)),

  getChildComment: async (parentCommentId, cursor, signal) =>
    handleRequest(() => commentApi.getChildComment(parentCommentId, cursor, signal)),

  createComment: async (postId, payload) =>
    handleRequest(() => commentApi.createComment(postId, payload)),

  updateComment: async (commentId, payload) =>
    handleRequest(() => commentApi.updateComment(commentId, payload)),

  deleteComment: async (commentId) =>
    handleRequest(() => commentApi.deleteComment(commentId)),

  createNewComment: async (postId, data) => {
    const mediaList = normalizeMediaList(data?.media)
  
    const externalUploadSessionId = data?.uploadSessionId || null
    let uploadSessionId = externalUploadSessionId

    if(!uploadSessionId && mediaList.length > 0){
      const uploadResult = await storageService.uploadUpdatedMediaAndGetSessionId(postId, mediaList)
      if(!uploadResult?.success){
        return {
          success:false,
          errorSource:"UPLOAD_STAGE",
          message: uploadResult?.message
        }
      }
      uploadSessionId = uploadResult.uploadSessionId
    }

    const payload = buildCreatePayload(data, uploadSessionId);
    if(Object.keys(payload).length === 0){
      return {
        success:false,
        errorSource: "VALIDATION_STAGE"
      }

    }

    const response = await commentService.createComment(postId, payload)
    
    return{
      ...response,
      _contextPayload:payload
    }
  }
};
