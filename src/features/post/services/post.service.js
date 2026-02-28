import { handleRequest } from '../../../api/helper'
import { postApi } from '../../../api/content/post/post.api'

export const postService = {
  getTimelineContent: async (username, cursor, signal) =>
    handleRequest(() =>
      postApi.getTimelineContent(username, cursor, signal)
    ),

  getSavedContent: async (cursor, signal) =>
    handleRequest(() => postApi.getSavedContent(cursor, signal)),

  createPost: async (payload) =>
    handleRequest(() => postApi.createPost(payload)),

  savePost: async (contentId) =>
    handleRequest(() => postApi.savePost(contentId)),

  unsavePost: async (contentId) =>
    handleRequest(() => postApi.unsavePost(contentId)),

  confirmContentUploadedMedia: async (payload) =>
    handleRequest(() => postApi.confirmContentUploadedMedia(payload)),
}

