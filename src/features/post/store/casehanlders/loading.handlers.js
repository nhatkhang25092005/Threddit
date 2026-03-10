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
            getUserPost:action.payload
          }
        }
      }

    case LOADING.GET_SAVED_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getSavedPost: Boolean(action.payload)
          }
        }
      }

    case LOADING.SET_POST_SAVE_LOADING: {
      const { id, isLoading } = action.payload || {}
      if (id == null) return state

      const currentItemLoading = state.loading.item?.[id] || itemModel()
      const nextSaveLoading = Boolean(isLoading)
      if (currentItemLoading.savePost === nextSaveLoading) return state

      return {
        ...state,
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [id]: {
              ...currentItemLoading,
              savePost: nextSaveLoading
            }
          }
        }
      }
    }

    case LOADING.SET_POST_PIN_LOADING: {
      const { id, isLoading } = action.payload || {}
      if (id == null) return state

      const currentItemLoading = state.loading.item?.[id] || itemModel()
      const nextPinLoading = Boolean(isLoading)
      if (currentItemLoading.pinPost === nextPinLoading) return state

      return {
        ...state,
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [id]: {
              ...currentItemLoading,
              pinPost: nextPinLoading
            }
          }
        }
      }
    }

    case LOADING.SET_CREATE_POST_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            createPost: Boolean(action.payload)
          }
        }
      }

    case LOADING.SET_CREATE_STORY_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            createStory: Boolean(action.payload)
          }
        }
      }

    case LOADING.SET_PRESIGN_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            presign: Boolean(action.payload)
          }
        }
      }

    default:return state
  }
}
