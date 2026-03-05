export const createLoadingSelector = (state) => {
  const getCreatePostLoading = () =>(
    state.loading.global.createPost
  )

  return {
    getCreatePostLoading
  }
}