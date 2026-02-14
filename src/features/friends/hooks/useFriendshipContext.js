import {useContext} from 'react'
import { FriendshipContext } from '../context'
export function useFriendshipContext() {
  const context = useContext(FriendshipContext)

  if (!context) {
    throw new Error('useFriendContext must be used inside FriendshipProvider')
  }

  return context
}