import { BLOCK_LIST_TYPES } from '../type'

export const blockListHandlers = (state, action) => {
  switch(action.type){
    case BLOCK_LIST_TYPES.SET_BLOCK_LIST:
      return {
        ...state,
        blockList: [...action.payload,...state.blockList],
      }
    case BLOCK_LIST_TYPES.REMOVE_BLOCKED_USER:
      return {
        ...state,
        loading:{
          ...state.loading,
          perBlock:{
            ...state.loading.perBlock,
            cancelBlock:{
            ...Object.fromEntries(
              Object.entries(state.loading.perBlock.cancelBlock)
                .filter(([key]) => key !== action.payload)
              )
            }
          }
        },
        blockList: state.blockList.filter(item => item.blockedUser.username !== action.payload),
      }
    case BLOCK_LIST_TYPES.SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload,
      }
    case BLOCK_LIST_TYPES.ADD_BLOCKED_USER:
      return{
        ...state,
        blockList:[action.payload, ...state.blockList]
      }
    case BLOCK_LIST_TYPES.RESET:
      return{
        ...state,
        blockList:[]
      }
    default:
      return state
  }
}