import { useReducer, useMemo, useEffect } from 'react'
import { BlockContext } from './context'
import { reducer, initState } from './store/reducer'
import { useGetBlockList } from './hooks/useGetBlockList'
import { useBlockUser } from './hooks/useBlockUser'
import { useUnblockUser } from './hooks/useUnblockUser'
import { useGetBlockStatus } from './hooks/useGetBlockStatus'
import { useCanNavigateToUser } from './hooks/useCanNavigateToUser'
import {blockListActions} from './store/actions'
import { useOrchestrate } from '../orchestrate/useOrchestrate'
export default function BlockProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  const {registerDispatch, unregisterDispatch} = useOrchestrate()
  
  const { getBlockList } = useGetBlockList(dispatch, state.hasMore)
  const { blockUser } = useBlockUser(dispatch)
  const { unblockUser } = useUnblockUser(dispatch)
  const getBlockStatus = useGetBlockStatus()
  const canNavigateToUser = useCanNavigateToUser()

  const value = useMemo(() => ({
    state,
    actions: {
      getBlockList,
      blockUser,
      unblockUser,
      getBlockStatus,
      canNavigateToUser
    }
  }), [
    state,
    getBlockList,
    blockUser,
    unblockUser,
    getBlockStatus,
    canNavigateToUser
  ])

  useEffect(()=>{
    registerDispatch('block', dispatch, blockListActions)
    return () => { unregisterDispatch('block')}
  },[registerDispatch,unregisterDispatch ])

  return (
    <BlockContext.Provider value={value}>
      {children}
    </BlockContext.Provider>
  )
}
