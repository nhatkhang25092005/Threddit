export function initialPostState(initialData = {}, isModal = false){
  return {
    post:{
      id: initialData.id || null,
      content: initialData.content || '',
      author: initialData.author || {},
      createdAt: initialData.createdAt || '',
      upvoteNumber: initialData.upvoteNumber || 0,
      downvoteNumber: initialData.downvoteNumber || 0,
      commentNumber: initialData.commentNumber || 0,
      saveNumber: initialData.saveNumber || 0,
      isSaved: initialData.isSaved || false,
      isPinned: initialData.isPinned || false,
    },
    vote: {
      isUpvote: initialData.isUpvote ?? null,
      up: Number(initialData.upvoteNumber || 0),
      down: Number(initialData.downvoteNumber || 0),
    },
    isPinned: initialData.isPinned || false,
    isModal:isModal,
    editing: {
      active: false,
      content: '',
    },
    loading: {
      pin: false,
      edit: false,
      delete: false,
    },
    error: {
      pin: null,
      edit: null,
      delete: null,
    },
    ui: {
      modal: {
        open: false,
      },
      snackbar: {
        open: false,
        message: '',
      }
    }
  }
}

export const postReducer = (state, action) => {
  switch(action.type){
    // ===================== VOTE =====================
    case 'VOTE_START': return state
    case 'VOTE_SUCCESS':
      return {
        ...state,
        vote:action.payload,
        post:{
          ...state.post,
          upvoteNumber:action.payload.up,
          downvoteNumber:action.payload.down
        }
      }
    case 'VOTE_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          vote:action.payload
        }
      }
    case 'VOTE_SYNC':
      return {
        ...state,
        vote:action.payload
      }
    
    //  ================== PIN ========================
    case 'PIN_START':
      return {
        ...state,
        loading: {
          ...state.loading,
          pin:true
        }
      }
    case 'PIN_SUCCESS':
      return {
        ...state,
        isPinned:!state.isPinned,
        post:{
          ...state.post,
          isPinned:!state.isPinned
        },
        loading: {
          ...state.loading,
          pin:false
        }
      }
    case 'PIN_ERROR':
      return {
        ...state,
        loading:{
          ...state.loading,
          pin:false
        },
        error:{
          ...state.error,
          pin:action.payload
        }
      }
    // ============== DELETE ============
    case 'DELETE_START':
      return {
        ...state,
        loading:{
          ...state.loading,
          delete:true
        }
      }
    case 'DELETE_SUCCESS':
      return{
        ...state,
        loading:{
          ...state.loading,
          delete:false,
        }
      }
    case 'DELETE_ERROR':
      return {
        ...state,
        loading:{
          ...state.loading,
          delete:false
        },
        error:{
          ...state.error,
          delete:action.payload
        }
      }
    // =================== EDIT ================
    case 'EDIT_START':
      return{
        ...state,
        editing:{
          active:true,
          content:action.payload
        }
      }
    case 'EDIT_UPDATE_CONTENT':
      return{
        ...state,
        editing:{
          ...state.editing,
          content:action.payload
        }
      }
    case 'EDIT_SAVE_START':
      return{
        ...state,
        loading:{
          ...state.loading,
          edit:true
        }
      }
    case 'EDIT_SAVE_SUCCESS':
      return{
        ...state,
        post:{
          ...state.post,
          content:action.payload
        },
        editing:{
          action:false,
          content:''
        },
        loading:{
          ...state.loading,
          edit:false
        }
      }
    case 'EDIT_SAVE_ERROR':
      return{
        ...state,
        loading:{
          ...state.loading,
          edit:false
        },
        error:{
          ...state.error,
          edit:action.payload
        }
      }
    case 'EDIT_CANCEL':
      return{
        ...state,
        editing:{
          active:false,
          content:''
        }
      }
    //===================== SAVE =======================
    case 'SAVE_TOGGLE_START':
      return state
    case 'SAVE_TOGGLE_SUCCESS':
      return{
        ...state,
        post:{
          ...state.post,
          isSaved:action.payload.isSaved,
          saveNumber:action.payload.saveNumber
        }
      }
    case 'SAVE_TOGGLE_ERROR':
      return{
        ...state,
        error:{
          ...state.error,
          save:action.payload
        }
      }
      case 'SAVE_SYNC':
        return{
          ...state,
          post:{
            ...state.post,
            isSaved:action.payload.isSaved,
            saveNumber:action.payload.saveNumber
          }
        }
    // ====================== COMMENT ===========================
      case 'COMMENT_SYNC':
        return {
          ...state,
          post: {
            ...state.post,
            commentNumber: action.payload.commentNumber
          }
        };
    // =================== UI ================================
      case 'UI_MODAL_OPEN':
        return{
          ...state,
          ui:{
            ...state.ui,
            modal:{
              open:true
            }
          }
        }
      case 'UI_MODAL_CLOSE':
        return{
          ...state,
          ui:{
            ...state.ui,
            modal:{
              open:false
            }
          }
        }
      case 'UI_SNACKBAR_OPEN':
        return{
          ...state,
          ui:{
            ...state.ui,
            snackbar:{
              open:true,
              message:action.payload
            }
          }
        }
      case 'UI_SNACKBAR_CLOSE':
        return{
          ...state,
          ui:{
            ...state.ui,
            snackbar:{
              open:false,
              message:''
            }
          }
        }
      default: {
        console.warn(`Action type: ${action.type} is not found!`)
        return state}
  }
}