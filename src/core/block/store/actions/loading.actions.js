import { createAction } from "../../../../model/createAction.model"
import { CLASS_TYPES,LOADING_TYPES } from "../type"
export const loadingActions = {
  setBlockListLoading : (loading) => (
    createAction(
      CLASS_TYPES.LOADING,
      LOADING_TYPES.SET_BLOCK_LIST_LOADING,
      loading
    )
  ),
  setBlockActionLoading: (loading) => (
    createAction(
      CLASS_TYPES.LOADING,
      LOADING_TYPES.SET_BLOCK_ACTION_LOADING,
      loading
    )
  ),
  getBlockStatusLoading: (loading) => (
    createAction(
      CLASS_TYPES.LOADING,
      LOADING_TYPES.GET_BLOCK_STATUS_LOADING,
      loading
    )
  ),
  cancelBlockLoading: (username, loading) => (
    createAction(
      CLASS_TYPES.LOADING,
      LOADING_TYPES.CANCEL_BLOCK_LOADING,
      {username, loading}
    )
  ),
}