import { PIN } from "../type"

const getPinKey = (username) => username || "pinned_post"

export const pinHandlers = (state, action) => {
  switch(action.type){
    case PIN.SET_PIN_LIST:{
      const payload = action.payload || {}
      const username = payload.username
      const type = payload.type === "story" ? "story" : "post"
      const idList = payload.idList || []
      const key = getPinKey(username)
      const normalizedIds = [...new Set((idList || []).filter((id) => id != null))]
      const currentPinned = (
        state.pinnedContents && typeof state.pinnedContents === "object"
          ? state.pinnedContents
          : { story: {}, post: {} }
      )

      return{
        ...state,
        pinnedContents: {
          ...currentPinned,
          [type]: {
            ...(currentPinned?.[type] || {}),
            [key]: normalizedIds
          }
        }
      }
    }
    default: return state
  }
}
