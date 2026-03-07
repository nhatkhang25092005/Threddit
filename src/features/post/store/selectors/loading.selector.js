export const createLoadingSelector = (state) => {
  const getCreatePostLoading = () =>(
    state.loading.global.createPost
  )
  const getUserPostFetchingLoading = () => (
    state.loading.global.getUserPost
  )
  const getSavedPostFetchingLoading = () => (
    state.loading.global.getSavedPost
  )
  return {
    getCreatePostLoading,
    getUserPostFetchingLoading,
    getSavedPostFetchingLoading
  }
}
