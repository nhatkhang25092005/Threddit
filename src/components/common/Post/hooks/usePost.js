import { useCallback, useReducer, useMemo, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {postReducer, initialPostState} from '../store/postReducer'
import {usePostSync} from './usePostSync'
import { postActions } from "../store/postActions"
import {ROUTES} from "../../../../constant"
import { normalizeItem } from "../helper/postHelper"
import { useNotify } from "../../../../hooks/useNotify"
import { PostSyncContext } from "../../../../provider/PostProvider"
/**
 * usePost Hook
 * -----------------------------------------------------------------------------
 * Centralized hook that manages all logic related to a Post.
 * This includes: voting, editing, deleting, pinning, saving, modal/snackbar UI,
 * syncing with global context, and computed fields like score.
 *
 * Purpose:
 * - Encapsulate all post business logic inside a single hook.
 * - Components only need to consume this hook → no business logic in UI layer.
 *
 * @param {string|number} postId - The ID of the post.
 * @param {object} options - Additional configuration options.
 * @param {object} [options.initialData] - Initial post data (typically from server).
 * @param {boolean} [options.isOwner=false] - Whether the current user owns this post.
 * @param {(result:any)=>void} [options.onResult] - UI callback (snackbar, popup notices).
 * @param {(update:any)=>void} [options.onPostUpdate] - Callback triggered when the post updates (edit/delete/pin).
 *
 * @returns {{
 *   state: {
 *     post: object,
 *     vote: object,
 *     editing: object,
 *     ui: object,
 *     isPinned: boolean,
 *     score: number
 *   },
 *   actions: {
 *     vote: (isUpvote:boolean)=>Promise<void>,
 *     togglePin: ()=>Promise<void>,
 *     delete: ()=>Promise<void>,
 *     startEdit: ()=>void,
 *     updateEditContent: (content:string)=>void,
 *     saveEdit: ()=>Promise<void>,
 *     cancelEdit: ()=>void,
 *     toggleSave: ()=>Promise<void>
 *   },
 *   ui: {
 *     modal: boolean,
 *     snackbar: object,
 *     openModal: ()=>void,
 *     closeModal: ()=>void,
 *     closeSnackbar: ()=>void,
 *     setShareResult: (result:any)=>void
 *   }
 * }}
 */

export const usePost = (postId, options = {}) => {
  const {
    initialData,
    isOwner = false,
    isModal = false,
    onResult,
    onPostUpdate
  } = options

  const newInitialData = normalizeItem(initialData)
  const {updateVote} = useContext(PostSyncContext)
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(postReducer, initialPostState(newInitialData, isModal))
  const notify = useNotify()
  // Sync with global post context
  usePostSync(postId, dispatch, state.ui.modal.open)

  /**
   * Vote on the post.
   * - isUpvote = true → upvote
   * - isUpvote = false → downvote
   *
   * Dispatches: VOTE_START → (VOTE_SUCCESS | VOTE_ERROR)
   *
   * @param {boolean} isUpvote
   */

  const vote = useCallback(async (isUpvote) => {
    dispatch({type:'VOTE_START'})
    try{
      const result = await postActions.vote(postId, isUpvote, state.vote)
      if(result.success){
        dispatch({
          type:"VOTE_SUCCESS",
          payload:result.data
        })
        updateVote(postId,result.data)
      }
      else notify.popup('Error', result.error)
    }
    catch(e){notify.popup('Error', e.message)}
  },[postId, state.vote, updateVote, notify])

  /**
   * Toggle the pinned status of the post.
   * Only available if `isOwner === true`.
   *
   * Dispatches: PIN_START → (PIN_SUCCESS | PIN_ERROR)
   */

  const togglePin = useCallback(async () => {
    if(!isOwner) return
    dispatch({type:'PIN_START'})

    try{
      const result = await postActions.togglePin(postId, state.isPinned)
      if(result.success){
        dispatch({type:'PIN_SUCCESS'})
        onPostUpdate?.({
          type:'pin',
          postId,
          newPinStatus:!state.isPinned
        })
        notify.snackbar(result.message)
      }
      else{
        dispatch({type:'PIN_ERROR', payload:result.error})
      }
    }
    catch(e){
      dispatch({type:'PIN_ERROR', payload:e.message})
      onResult?.(e)
    }
  },[postId, state.isPinned, isOwner, onPostUpdate, onResult, notify])

  /**
   * Delete the post.
   * Only available for the owner.
   *
   * Dispatches: DELETE_START → (DELETE_SUCCESS | DELETE_ERROR)
   * Triggers external callbacks via onPostUpdate and onResult.
   */

  const deletePost = useCallback(async () => {
    if(!isOwner) return
    dispatch({type:'DELETE_START'})

    try{
      const result = await postActions.delete(postId)
      if(result.success){
        dispatch({type:'DELETE_SUCCESS'})
        onPostUpdate?.({
          type:'delete',
          postId
        })
        notify.snackbar(result.message)
      }
      else{
        dispatch({ type: 'DELETE_ERROR', payload: result.error })
        notify.popup('Error', result.error)
      }
    }
    catch(e){
      dispatch({ type: 'DELETE_ERROR', payload: e.message });
      onResult?.(e);
    }
  },[postId, isOwner, onPostUpdate, onResult, notify])

  /**
   * Begin editing mode by loading the current content into editing state.
   */
  const startEdit = useCallback(() => {
    dispatch({
      type: 'EDIT_START',
      payload: state.post.content
    });
  }, [state.post.content]);

  /**
   * Update the editing content.
   *
   * @param {string} content
   */
  const updateEditContent = useCallback((content) => {
    dispatch({
      type: 'EDIT_UPDATE_CONTENT',
      payload: content
    });
  }, []);

  /**
   * Save the edited content.
   * Dispatches: EDIT_SAVE_START → (EDIT_SAVE_SUCCESS | EDIT_SAVE_ERROR)
   */
  const saveEdit = useCallback(async () => {
    if (!state.editing.content.trim()) return;
    
    dispatch({ type: 'EDIT_SAVE_START' });
    
    try {
      const result = await postActions.edit(
        postId, 
        state.editing.content
      );
      
      if (result.success) {
        dispatch({ 
          type: 'EDIT_SAVE_SUCCESS', 
          payload: result.data.content 
        });
        onPostUpdate?.({
          type: 'edit',
          postId,
          data: { content: result.data.content }
        });
        notify.snackbar(result.message || "Đã cập nhật bài viết", 3000)
      } else {
        dispatch({ 
          type: 'EDIT_SAVE_ERROR', 
          payload: result.error 
        });
        notify.popup('Error', result.error)
      }
    } catch (error) {
      dispatch({ 
        type: 'EDIT_SAVE_ERROR', 
        payload: error.message 
      });
      onResult?.(error);
    }
  }, [postId, state.editing.content, onPostUpdate, onResult, notify]);

  /**
   * Cancel editing mode (discard changes).
   */
  const cancelEdit = useCallback(() => {
    dispatch({ type: 'EDIT_CANCEL' });
  }, []);
  const openModal = useCallback(()=>{
    if(!state.isModal){
      dispatch({type:'UI_MODAL_OPEN'})
      navigate(`${ROUTES.USER}/${postId}`,{replace:true})
    }
  },[navigate, postId, state.isModal])

  const closeModal = useCallback(()=>{
    dispatch({ type: 'UI_MODAL_CLOSE' });
    navigate(ROUTES.USER, {replace:true});
  }, [navigate])

  const setShareResult = useCallback((result) => {
    dispatch({
      type: 'UI_SNACKBAR_OPEN',
      payload: result?.message
    });
  }, []);

  // COMPUTED VALUES

  const score = useMemo(()=>{
    return state.vote.up - state.vote.down
  },[state.vote.up, state.vote.down])

  // RETURN
  return {
    state: {
      ...state,
      score
    },
    actions: {
      vote,
      togglePin,
      delete: deletePost,
      startEdit,
      updateEditContent,
      saveEdit,
      cancelEdit,
    },
    ui: {
      modal: state.ui.modal,
      snackbar: state.ui.snackbar,
      openModal,
      closeModal,
      setShareResult
    }
  };
}
