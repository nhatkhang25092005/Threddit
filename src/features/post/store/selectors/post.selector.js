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

  const getDeleteLoadingByPostIdOf = (postId) => {
    return Boolean(getPostLoadingById(postId)?.deleteContent)
  }

  const getUsersPostIds = (username) =>
    state.contentList.usersPost?.[username] ?? []

  const getSavedPostIds = () =>
    state.contentList.savedPost ?? []

  const getPinnedPostIds = (username) => {
    const key = getPostKey(username)
    const rawPinnedPost = state.pinnedContents?.post
    if (Array.isArray(rawPinnedPost)) return rawPinnedPost
    return rawPinnedPost?.[key] ?? []
  }

  const getUserPostList = (username) => {
    const postIds = getUsersPostIds(username)
    const pinnedIds = getPinnedPostIds(username)
    const byId = state.postById ?? {}

    const sortDefaultPost = [...new Set(postIds)].map(id => byId[id])
      .filter(Boolean)
      .sort((a,b)=>new Date(b.time.createdAt) - new Date(a.time.createdAt))

    const pinnedPosts = [...new Set(pinnedIds)].map(id => byId[id])
      .filter(Boolean)
      .sort((a,b)=>new Date(b.time.createdAt) - new Date(a.time.createdAt))

    return [...pinnedPosts, ... sortDefaultPost]
  }

  const getSavedPostList = () => {
    const byId = state.postById ?? {}
    return getSavedPostIds().map((id) => ({...byId[id], context:'savedPost'})).filter(Boolean)
  }

  const getUserPostListHasMore = (username) => {
    return state.userPostHasMore[username]
  }

  const getSavedPostListHasMore = () => {
    return state.mySavedHasMore
  }

  const getPostPinStatusOf = (postId) => {
    return Boolean(state.postById?.[postId]?.isPinned)
  }

  const getPostPinLoadingOf = (postId) => {
    return Boolean(state.loading.item?.[postId]?.pinPost)
  }

  return{
    getPostById,
    getUsersPostIds,
    getSavedPostIds,
    getPinnedPostIds,
    getSaveStatusByPostIdOf,
    getSaveLoadingByPostIdOf,
    getPinLoadingByPostIdOf,
    getDeleteLoadingByPostIdOf,
    getUserPostList,
    getSavedPostList,
    getUserPostListHasMore,
    getSavedPostListHasMore,
    getPostPinStatusOf,
    getPostPinLoadingOf
  }
}
