import { useMemo, useReducer } from 'react'
import { FollowContext } from './context'
import { reducer, initState } from '../reducer'
import { services } from '../services'
import { useGetFollowers, useGetFollowings, useFollow} from '../hooks'
import { useProfileContext } from '../../profile/hooks/useProfileContext'

export default function FollowProvider({ children }) {
  /* ---------------- state ---------------- */
  const [state, dispatch] = useReducer(reducer, initState)
  const { state: { username }} = useProfileContext()
  /* ---------------- side-effect hooks ---------------- */

  const { getFollowers } = useGetFollowers(dispatch, username)
  const { getFollowings } = useGetFollowings(dispatch, username)
  const { toggleFollow} = useFollow(dispatch)

  /* ---------------- cross-module sync API ---------------- */
  const followSync = services.createSyncFollow(dispatch)

  /* ---------------- exposed actions ---------------- */
  const actions = useMemo(
    () => ({
      follower: {getFollowers},
      following: {getFollowings},
      followSync,
      toggleFollow,
    }),
    [getFollowers, getFollowings, followSync, toggleFollow]
  )

  /* ---------------- provider value ---------------- */
  const value = useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
  )

  return (
    <FollowContext.Provider value={value}>
      {children}
    </FollowContext.Provider>
  )
}
