import { useCallback } from "react";
import { toggleService } from "../service/toggleService";
export const useToggle =  ({postId, saveState, dispatch, onToggle = null}) => {
  const toggle = useCallback(async()=>{
    dispatch({type:'SUCCESS'})
    try{
      const res = await toggleService(postId, saveState)
      if(!res.success){
        dispatch({type:'ERROR',payload:res.message})
        return false
      }
      return true
    }
    catch(e){
      dispatch({type:'ERROR',payload:e.message})
      return false
    }
  },[dispatch, postId, saveState])

  return{
    toggle
  }
}

/**
 *
 * Toggle
 * - change the save state
 * - update the save state on context
 * - execute rest props (if having)
 */