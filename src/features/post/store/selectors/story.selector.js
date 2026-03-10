export const createStorySelector = (state) => {
  const getStoryKey = (username) => username || "pinned_story"

  const getStoryById = (storyId) => {
    if (storyId == null) return null
    return state.storyById?.[storyId] || null
  }

  const getPinnedStoryIdsOf = (username) => {
    const key = getStoryKey(username)
    return state.pinnedContents.story?.[key] ?? []
  }

  const getPinnedStoryListOf = (username) => {
    const storyIds = getPinnedStoryIdsOf(username)
    const uniqueIds = [...new Set(storyIds.filter((id) => id != null))]
    return uniqueIds
      .map((id) => getStoryById(id))
      .filter(Boolean)
  }

  const getPinnedStoryIds = () => getPinnedStoryIdsOf()
  const getPinnedStoryList = () => getPinnedStoryListOf()

  return {
    getStoryById,
    getPinnedStoryIds,
    getPinnedStoryList,
    getPinnedStoryIdsOf,
    getPinnedStoryListOf
  }
}
