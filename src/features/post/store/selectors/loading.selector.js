export const createLoadingSelector = (state) => {
  const getCreatePostLoading = () =>(
    state.loading.global.createPost
  )
  const getCreateStoryLoading = () => (
    state.loading.global.createStory
  )
  const getUserPostFetchingLoading = () => (
    state.loading.global.getUserPost
  )
  const getSavedPostFetchingLoading = () => (
    state.loading.global.getSavedPost
  )
  return {
    getCreatePostLoading,
    getCreateStoryLoading,
    getUserPostFetchingLoading,
    getSavedPostFetchingLoading
  }
}
