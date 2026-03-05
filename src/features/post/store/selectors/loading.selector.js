export const createLoadingSelector = (state) => {
  const getCreatePostLoading = () =>(
    state.loading.global.createPost
  )
  const getUserPostFetchingLoading = () => (
    state.loading.global.getUserPost
  )
  return {
    getCreatePostLoading,
    getUserPostFetchingLoading
  }
}