export const createReactionSelector = (state) => {
  const getMyReactionOf = (contentId) => {
    return state.postById[contentId].viewer.reaction
  }

  return{
    getMyReactionOf
  }
}