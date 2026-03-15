import { handleRequest } from '../../../api/helper'
import { storyApi } from '../../../api/content/story/story.api'
import { postApi } from '../../../api/content/post/post.api'

export const storyService = {
  getPinnedStory: async (username = null, signal, cursor) =>
    handleRequest(() => storyApi.getPinnedStory(username, signal, cursor)),

  createStory: async (payload) =>
    handleRequest(()=>postApi.createPost({...payload, type:'story'})),

  getCurrentStory: async (username = null, signal, cursor) =>
    handleRequest(()=>storyApi.getCurrentStory(username, signal, cursor)),

  getFriendStoryList: async (cursor = null, signal) =>
    handleRequest(() => storyApi.getFriendStoryList(cursor, signal)),

  editStory: async (id, payload) =>
    handleRequest(() => postApi.editContent(id, payload)),

  deleteStory: async (id) =>
    handleRequest(() => postApi.deleteContent(id))
}
