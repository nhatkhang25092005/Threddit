import {  useReducer, useMemo } from 'react'
import { FriendshipContext } from './context'
import { reducer, initState } from './store/reducer'
import { useGetFriendList } from './hooks/useGetFriendList'
import { useGetRequestList } from './hooks/useGetRequestList'
import { useGetSentList } from './hooks/useGetSentList'
import { useGetMutualList } from './hooks/useGetMutualList'
import { useAcceptRequest } from './hooks/useAcceptRequest'
import { useRejectRequest } from './hooks/useRejectRequest'
import { useCancelRequest } from './hooks/useCancelRequest'
import { useProfileContext } from '../profile/hooks'
import { useDeleteFriend } from './hooks/useDeleteFriend'
import { useRequestFriend } from './hooks/useRequestFriend'
import { useGetMutualNumber } from './hooks/useGetMutualNumber'
import { useGetRequestNumber } from './hooks/useGetRequestNumber'
import { useGetSentNumber } from './hooks/useGetSentNumber'


export default function FriendshipProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  const {isOwner} = useProfileContext()
  const {getFriendList} = useGetFriendList(dispatch)
  const {getRequestList} = useGetRequestList(dispatch, isOwner)
  const {getSentList} = useGetSentList(dispatch, isOwner)
  const {getMutualList} = useGetMutualList(dispatch)
  const {acceptRequest} = useAcceptRequest(dispatch)
  const {rejectRequest} = useRejectRequest(dispatch)
  const {cancelRequest} = useCancelRequest(dispatch)
  const {deleteFriend} = useDeleteFriend(dispatch)
  const {requestFriend} = useRequestFriend(dispatch)
  useGetMutualNumber()
  useGetRequestNumber(dispatch)
  useGetSentNumber(dispatch)

const value = useMemo(() => ({
  state,
  actions: {
    getFriendList,
    getRequestList,
    getSentList,
    getMutualList,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    deleteFriend,
    requestFriend
  }
}), [
  state,
  getFriendList,
  getRequestList,
  getSentList,
  getMutualList,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  deleteFriend,
  requestFriend
])

  return (
    <FriendshipContext.Provider value={value}>
      {children}
    </FriendshipContext.Provider>
  )
}





