import { handleRequest } from '../../../api/helper'
import { storyApi } from '../../../api/content/story/story.api'

export const storyService = {
  getPinnedStory: async (username = null, signal, cursor) =>
    handleRequest(() => storyApi.getPinnedStory(username, signal, cursor)),
}
