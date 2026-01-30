import { FollowContext } from "../provider/context"
import { useContext } from "react"

export function useFollowContext(){
  const context = useContext(FollowContext)

  if (!context) {
    throw new Error('useFollowContext must be used within FollowProvider')
  }

  return context
}
