export const createPostSelector = (state) => {
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

  return{
    getPostById,
    getSaveStatusByPostIdOf,
    getSaveLoadingByPostIdOf
  }
}
