import { LOADING_TYPES } from "../type"
export const loadingHandler = (state, action) => {
  switch(action.type){
    case LOADING_TYPES.SET_BLOCK_LIST_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          global:{
            ...state.loading.global,
            getBlockList:action.payload
          }
        }
      }
    case LOADING_TYPES.SET_BLOCK_ACTION_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            blockUser: action.payload,
          },
        },
      }
    // case LOADING_TYPES.GET_BLOCK_STATUS_LOADING:{
    //   const {username, loading} = action.payload
    //   return {
    //     ...state,
    //     loading: {
    //       ...state.loading,
    //       perBlock: {
    //         ...state.loading.perBlock,
    //         cancelBlock: {
    //           ...state.loading.perBlock.cancelBlock,
    //           [username]: loading,
    //         },
    //       },
    //     },
    //   }
    // }
    case LOADING_TYPES.CANCEL_BLOCK_LOADING: {
      const { username, loading } = action.payload
      return {
        ...state,
        loading: {
          ...state.loading,
          perBlock: {
            ...state.loading.perBlock,
            cancelBlock: {
              ...state.loading.perBlock.cancelBlock,
              [username]: loading,
            },
          },
        },
      }
    }

    default: return state
  }
}