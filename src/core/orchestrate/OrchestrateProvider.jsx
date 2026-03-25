import { useCallback, useRef, useMemo } from "react";
import {OrchestrateContext} from './context'

export default function OrchestrateProvider({children}){
  const dispatchRegistry = useRef({})
  
  const dispatch = useCallback((feature, actionName, payload) => {
    const entry = dispatchRegistry.current[feature]
    const action = entry?.action?.[actionName]
    if (!action) {
      if (entry) console.warn(`orchestrate action not found: ${feature}.${actionName}`)
      return
    }
    entry.dispatch(action(payload))
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
    block: {
      addBlockUser: (user) => {
        dispatch('block', 'addBlockUser', user)
      },
    },
    profile: {
      setFollowLoading: (loading) => {
        dispatch('profile', 'setFollowLoading', loading)
      },
      followSuccess: () => {
        dispatch('profile', 'followSuccess')
      },
      unfollowSuccess: () => {
        dispatch('profile', 'unfollowSuccess')
      },
      acceptRequestSuccess: () => {
        dispatch('profile', 'increaseFriendNumber')
      },
      requestFriendSuccess: () => {
        dispatch('profile', 'setFriendStatus', 'pending_sent')
      },
      cancelRequestSuccess: ({ onProfile = false } = {}) => {
        if (onProfile) {
          dispatch('profile', 'setFriendStatus', null)
        }
      },
      deleteFriendSuccess: ({ onProfile = false } = {}) => {
        dispatch('profile', 'decreaseFriendNumber')
        if (onProfile) {
          dispatch('profile', 'setFriendStatus', null)
        }
      },
      getMutualNumberLoading: (loading) => {
        dispatch('profile', 'setMutualNumberLoading', loading)
      },
      getMutualNumberSuccess: (count) => {
        dispatch('profile', 'setMutualNumber', count)
      },
    },
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
