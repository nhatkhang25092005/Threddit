export const createPostSelector = (state) => {
  const getPostKey = (username) => username || "pinned_post"

  const getPostById = (postId) => {
    if (postId == null) return null
    return state.postById?.[postId] || null
  }

  const getPostLoadingById = (postId) => {
    if (postId == null) return null
    return state.loading?.item?.[postId] || null
  }

  const getSaveStatusByPostIdOf  = (postId) => {
    return Boolean(getPostById(postId)?.viewer?.isSaved)
  }

  const getSaveLoadingByPostIdOf = (postId) => {
    return Boolean(getPostLoadingById(postId)?.savePost)
  }

  const getPinLoadingByPostIdOf = (postId) => {
    return Boolean(getPostLoadingById(postId)?.pinPost)
  }

  const getUsersPostIds = (username) =>
    state.contentList.usersPost?.[username] ?? []

  const getPinnedPostIds = (username) => {
    const key = getPostKey(username)
    const rawPinnedPost = state.pinnedContents?.post
    if (Array.isArray(rawPinnedPost)) return rawPinnedPost
    return rawPinnedPost?.[key] ?? []
  }

  const getUserPostList = (username) => {
    const postIds = getUsersPostIds(username)
    const pinnedIds = getPinnedPostIds(username)
    const ids = [...pinnedIds, ...postIds].filter((id) => id != null)
    const uniqueIds = [...new Set(ids)]
    const byId = state.postById ?? {}
    return uniqueIds.map((id) => byId[id]).filter(Boolean)
  }

  const getUserPostListHasMore = (username) => {
    return state.userPostHasMore[username]
  }

  const getPostPinStatusOf = (postId) => {
    return state.postById[postId].isPinned
  }

  const getPostPinLoadingOf = (postId) => {
    return state.loading.item?.[postId]?.pinPost
  }

  return{
    getPostById,
    getUsersPostIds,
    getPinnedPostIds,
    getSaveStatusByPostIdOf,
    getSaveLoadingByPostIdOf,
    getPinLoadingByPostIdOf,
    getUserPostList,
    getUserPostListHasMore,
    getPostPinStatusOf,
    getPostPinLoadingOf
  }
}
