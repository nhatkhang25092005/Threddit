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

  pinPost: async (id) =>
    handleRequest(()=> postApi.pinPost(id)),

  unPinPost: async (id) =>
    handleRequest(()=> postApi.unPinPost(id))
}

