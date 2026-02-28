import { CLASS_TYPE, LOADING } from '../type'
import { createAction } from '../models/action.model'

export const loadingAction = {
  getPostListLoading : (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.GET_POST_LIST,
      isLoading
    )
  ),

  setPostSaveLoading: (contentId, isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_POST_SAVE_LOADING,
      { contentId, isLoading }
    )
  )
}
