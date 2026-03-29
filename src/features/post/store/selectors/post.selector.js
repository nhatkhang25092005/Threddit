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

  const getShareStatusByPostIdOf  = (postId) => {
    return Boolean(
      getPostById(postId)?.viewer?.isShare ??
      getPostById(postId)?.viewer?.isShared
    )
  }

  const getIsOwnerByPostIdOf = (postId) => {
    return Boolean(getPostById(postId)?.isOwner)
  }

  const getSaveLoadingByPostIdOf = (postId) => {
    return Boolean(getPostLoadingById(postId)?.savePost)
  }

  const getShareLoadingByPostIdOf = (postId) => {
    return Boolean(getPostLoadingById(postId)?.sharePost)
  }

  const getPinLoadingByPostIdOf = (postId) => {
    return Boolean(getPostLoadingById(postId)?.pinPost)
  }

  const getDeleteLoadingByPostIdOf = (postId) => {
    return Boolean(getPostLoadingById(postId)?.deleteContent)
  }

  const getUsersPostIds = (username) =>
    state.contentList.usersPost?.[username] ?? []

  const getFeedIds = () =>
    state.contentList.home?.feeds ?? []

  const getReelIds = () =>
    state.contentList.reel ?? []

  const getSearchIds = () =>
    state.contentList.searchList ?? []

  const getSearchUsers = () =>
    state.contentList.searchUsers ?? []

  const getFeedListHasMore = () => {
    return state.feedHasMore
  }

  const getReelListHasMore = () => {
    return state.reelHasMore
  }

  const getSearchListHasMore = () => {
    return state.searchHasMore
  }

  const getSearchUsersHasMore = () => {
    return state.searchUsersHasMore
  }

  const getSearchKeyword = () => {
    return state.searchKeyword ?? ""
  }

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

  const getFeedList = () => {
    const byId = state.postById ?? {}
    return getFeedIds().map((id) => ({ ...byId[id], context: 'feed' })).filter(Boolean)
  }

  const getReelList = () => {
    const byId = state.postById ?? {}
    return getReelIds().map((id) => ({ ...byId[id], context: 'reel' })).filter(Boolean)
  }

  const getSearchList = () => {
    const byId = state.postById ?? {}
    return getSearchIds().map((id) => ({ ...byId[id], context: 'search' })).filter(Boolean)
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
    getFeedIds,
    getReelIds,
    getSearchIds,
    getSearchUsers,
    getFeedListHasMore,
    getReelListHasMore,
    getSearchListHasMore,
    getSearchUsersHasMore,
    getSearchKeyword,
    getUsersPostIds,
    getSavedPostIds,
    getPinnedPostIds,
    getSaveStatusByPostIdOf,
    getShareStatusByPostIdOf,
    getIsOwnerByPostIdOf,
    getSaveLoadingByPostIdOf,
    getShareLoadingByPostIdOf,
    getPinLoadingByPostIdOf,
    getDeleteLoadingByPostIdOf,
    getUserPostList,
    getFeedList,
    getReelList,
    getSearchList,
    getSavedPostList,
    getUserPostListHasMore,
    getSavedPostListHasMore,
    getPostPinStatusOf,
    getPostPinLoadingOf
  }
}
