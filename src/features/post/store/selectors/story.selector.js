export const createStorySelector = (state) => {
  const getStoryKey = (username) => username || "pinned_story"

  const getStoryById = (storyId) => {
    if (storyId == null) return null
    return state.postById?.[storyId] || null
  }

  const getPinnedStoryIdsOf = (username) => {
    const key = getStoryKey(username)
    if (Array.isArray(state.storyList)) return state.storyList
    return state.storyList?.[key] ?? []
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
