import { blockListHandlers, loadingHandler } from '../casehandler'
import { CLASS_TYPES } from '../type'


export const reducer = (state, action) => {
  switch(action.actionClass){
    case(CLASS_TYPES.BLOCK_LIST) : return blockListHandlers(state, action)
    case(CLASS_TYPES.LOADING): return loadingHandler(state, action)
    default: return state
  }
}


