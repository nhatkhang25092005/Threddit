export const createStorySelector = (state) => {
  const getStoryKey = (username) => username || "current_story"
  const getPinnedStoryKey = (username) => username || "pinned_story"

  const getStoryById = (storyId) => {
    if (storyId == null) return null
    return state.storyById?.[storyId] || null
  }

  const getStoryLoadingById = (storyId) => {
    if (storyId == null) return null
    return state.loading?.item?.[storyId] || null
  }

  const getCurrentStoryIdsOf = (username) => {
    const key = getStoryKey(username)

    return state.contentList.currentStory?.[key] ?? []
  }

  const getCurrentStoryListOf = (username) => {
    const storyIds = getCurrentStoryIdsOf(username)
    const uniqueIds = [...new Set(storyIds.filter((id) => id != null))]
    return uniqueIds
      .map((id) => getStoryById(id))
      .filter(Boolean)
  }

  const isHaveCurrentStory = (username) => getCurrentStoryIdsOf(username).length > 0

  const getPinnedStoryIdsOf = (username) => {
    const key = getPinnedStoryKey(username)
    return state.pinnedContents.story?.[key] ?? []
  }

  const getPinnedStoryListOf = (username) => {
    const storyIds = getPinnedStoryIdsOf(username)
    const uniqueIds = [...new Set(storyIds.filter((id) => id != null))]
    return uniqueIds
      .map((id) => getStoryById(id))
      .filter(Boolean)
  }

  const getStoryIds = () => getCurrentStoryIdsOf()
  const getStoryList = () => getCurrentStoryListOf()
  const getPinnedStoryIds = () => getPinnedStoryIdsOf()
  const getPinnedStoryList = () => getPinnedStoryListOf()

  const getDeleteLoadingByStoryIdOf = (storyId) => (
    Boolean(getStoryLoadingById(storyId)?.deleteContent)
  )

  return {
    isHaveCurrentStory,
    getStoryById,
    getStoryLoadingById,
    getStoryIds,
    getStoryList,
    getCurrentStoryIdsOf,
    getCurrentStoryListOf,
    getPinnedStoryIds,
    getPinnedStoryList,
    getPinnedStoryIdsOf,
    getPinnedStoryListOf,
    getDeleteLoadingByStoryIdOf
  }
}
