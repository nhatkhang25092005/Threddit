import { FollowContext } from './context'
import { useMemo, useReducer } from 'react'
import { reducer, initState } from '../reducer'
import {
  useGetFollowers
} from '../hooks'
export default function FollowProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)

  // Chưa có hooks => actions để trống (sau này gắn vào)
  const {getFollowers} = useGetFollowers(dispatch)


  const value = useMemo(() => ({
    state,
    actions: {
      follower:{
        getFollowers
      },
      following:{
        
      }
    }
  }), [state, getFollowers])

  return (
    <FollowContext.Provider value={value}>
      {children}
    </FollowContext.Provider>
  )
}
