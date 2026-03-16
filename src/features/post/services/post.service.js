import { handleRequest } from '../../../api/helper'
import { postApi } from '../../../api/content/post/post.api'

export const postService = {
  getPostContent: async (username, cursor, signal) =>
    handleRequest(() =>postApi.getPostContent(username, cursor, signal)),

  getSavedContent: async (cursor, signal) =>
    handleRequest(() => postApi.getSavedContent(cursor, signal)),

  createPost: async (payload) =>
    handleRequest(() => postApi.createPost({...payload, type:'post'})),

  savePost: async (id) =>
    handleRequest(() => postApi.savePost(id)),

  unsavePost: async (id) =>
    handleRequest(() => postApi.unsavePost(id)),

  sharePost: async (id, payload) =>
    handleRequest(() => postApi.shareContent(id, payload)),

  unsharePost: async (id) =>
    handleRequest(() => postApi.unshareContent(id)),

  pinContent: async (id) =>
    handleRequest(()=> postApi.pinContent(id)),

  unPinContent: async (id) =>
    handleRequest(()=> postApi.unPinContent(id)),

  editPost: async (id, payload) =>
    handleRequest(() => postApi.editContent(id, payload)),

  deletePost: async (id) =>
    handleRequest(() => postApi.deleteContent(id))
}

