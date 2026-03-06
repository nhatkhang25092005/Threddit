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

  getSavedListLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_POST_SAVE_LOADING,
      isLoading
    )
  ),

  setPostSaveLoading: (id, isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_POST_SAVE_LOADING,
      { id, isLoading }
    )
  ),

  setPostPinLoading: (id, isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_POST_PIN_LOADING,
      { id, isLoading }
    )
  ),

  setCreatePostLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_CREATE_POST_LOADING,
      isLoading
    )
  ),

  setPresignLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_PRESIGN_LOADING,
      isLoading
    )
  )
}
