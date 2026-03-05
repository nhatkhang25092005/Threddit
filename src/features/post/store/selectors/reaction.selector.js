export const createReactionSelector = (state) => {
  const getMyReactionOf = (id) => {
    if (id == null) return null
    return state.postById?.[id]?.viewer?.reaction || null
  }

  return{
    getMyReactionOf
  }
}
