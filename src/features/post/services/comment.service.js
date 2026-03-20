import { handleRequest } from "../../../api/helper";
import { commentApi } from "../../../api/content/comments/comment.api";

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
};
