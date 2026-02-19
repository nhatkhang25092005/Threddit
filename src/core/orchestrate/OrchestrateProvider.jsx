import { useCallback, useRef, useMemo } from "react";
import {OrchestrateContext} from './context'

export default function OrchestrateProvider({children}){
  const dispatchRegistry = useRef({})
  
  const dispatch = useCallback((feature, actionName, payload) => {
    const entry = dispatchRegistry.current[feature]
    entry?.dispatch(entry.action[actionName](payload))
  }, [])

  const registerDispatch = useCallback((featureName, dispatch, action)=>{
    if (dispatchRegistry.current[featureName]) {
      console.warn(`${featureName} already registered`)
    }
    dispatchRegistry.current[featureName] = {dispatch, action}
  },[])

  const unregisterDispatch = useCallback((featureName)=>{
    delete dispatchRegistry.current?.[featureName]
  },[])

  const sync = useMemo(()=>({
    blockUser : (user)=>{
      dispatch('block','addBlockUser',user)
      // dispatchRegistry.current['follow']?.({type:'',payload:user})
      // dispatchRegistry.current['friends']?.({type:'',payload:user})
    },
    // more
  }),[dispatch])
    
  const value = useMemo(()=>({
    sync,
    registerDispatch,
    unregisterDispatch
}),[sync, registerDispatch, unregisterDispatch])


  return(
    <OrchestrateContext.Provider value={value}>
      {children}
    </OrchestrateContext.Provider>
  )
}