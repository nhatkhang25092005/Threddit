import { itemModel } from '../models/item.model'
import {LOADING} from '../type'
export const loadingHandlers = (state, action) => {
  switch (action.type){
    case LOADING.GET_DETAIL_POST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getDetailPost: Boolean(action.payload)
          }
        }
      }

    case LOADING.GET_FEED_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getFeeds: Boolean(action.payload)
          }
        }
      }

    case LOADING.GET_REEL_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getReels: Boolean(action.payload)
          }
        }
      }

    case LOADING.GET_SEARCH_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getSearch: Boolean(action.payload)
          }
        }
      }

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

    case LOADING.GET_COMMENT_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getCommentList: Boolean(action.payload)
          }
        }
      }

    case LOADING.SET_COMMENT_LOADING: {
      const { id, isLoading } = action.payload || {}
      if (id == null) return state

      const currentItemLoading = state.loading.item?.[id] || itemModel()
      const nextCommentLoading = Boolean(isLoading)
      if (currentItemLoading.comments === nextCommentLoading) return state

      return {
        ...state,
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [id]: {
              ...currentItemLoading,
              comments: nextCommentLoading
            }
          }
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

    case LOADING.SET_POST_SHARE_LOADING: {
      const { id, isLoading } = action.payload || {}
      if (id == null) return state

      const currentItemLoading = state.loading.item?.[id] || itemModel()
      const nextShareLoading = Boolean(isLoading)
      if (currentItemLoading.sharePost === nextShareLoading) return state

      return {
        ...state,
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [id]: {
              ...currentItemLoading,
              sharePost: nextShareLoading
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

    case LOADING.SET_CONTENT_DELETE_LOADING: {
      const { id, isLoading } = action.payload || {}
      if (id == null) return state

      const currentItemLoading = state.loading.item?.[id] || itemModel()
      const nextDeleteLoading = Boolean(isLoading)
      if (currentItemLoading.deleteContent === nextDeleteLoading) return state

      return {
        ...state,
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [id]: {
              ...currentItemLoading,
              deleteContent: nextDeleteLoading
            }
          }
        }
      }
    }

    case LOADING.SET_EDIT_POST_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            editPost: Boolean(action.payload)
          }
        }
      }

    case LOADING.SET_EDIT_STORY_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            editStory: Boolean(action.payload)
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
