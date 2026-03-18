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
      LOADING.GET_SAVED_LIST,
      isLoading
    )
  ),

  getCommentListLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.GET_COMMENT_LIST,
      isLoading
    )
  ),

  setCommentLoading: (id, isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_COMMENT_LOADING,
      { id, isLoading }
    )
  ),

  setPostSaveLoading: (id, isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_POST_SAVE_LOADING,
      { id, isLoading }
    )
  ),

  setPostShareLoading: (id, isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_POST_SHARE_LOADING,
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

  setContentDeleteLoading: (id, isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_CONTENT_DELETE_LOADING,
      { id, isLoading }
    )
  ),

  setEditPostLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_EDIT_POST_LOADING,
      isLoading
    )
  ),

  setEditStoryLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_EDIT_STORY_LOADING,
      isLoading
    )
  ),

  setCreatePostLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_CREATE_POST_LOADING,
      isLoading
    )
  ),

  setCreateStoryLoading: (isLoading) => (
    createAction(
      CLASS_TYPE.LOADING,
      LOADING.SET_CREATE_STORY_LOADING,
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
