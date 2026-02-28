import { itemModel } from '../models/item.model'
import {LOADING} from '../type'
export const loadingHandlers = (state, action) => {
  switch (action.type){
    case LOADING.GET_POST_LIST:
      return{
        ...state,
        loading:{
          ...state.loading,
          global:{
            ...state.loading.global,
            getFollowPost:action.payload
          }
        }
      }

    case LOADING.SET_POST_SAVE_LOADING: {
      const { contentId, isLoading } = action.payload || {}
      if (contentId == null) return state

      const currentItemLoading = state.loading.item?.[contentId] || itemModel()
      const nextSaveLoading = Boolean(isLoading)
      if (currentItemLoading.savePost === nextSaveLoading) return state

      return {
        ...state,
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [contentId]: {
              ...currentItemLoading,
              savePost: nextSaveLoading
            }
          }
        }
      }
    }

    default:return state
  }
}
