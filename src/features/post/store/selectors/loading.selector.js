export const createLoadingSelector = (state) => {
  const getCreatePostLoading = () =>(
    state.loading.global.createPost
  )
  const getCreateStoryLoading = () => (
    state.loading.global.createStory
  )
  const getEditPostLoading = () => (
    state.loading.global.editPost
  )
  const getEditStoryLoading = () => (
    state.loading.global.editStory
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
    getEditPostLoading,
    getEditStoryLoading,
    getUserPostFetchingLoading,
    getSavedPostFetchingLoading
  }
}
