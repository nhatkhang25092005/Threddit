import { useContext } from "react"
import { PostContext } from "../provider/postContext"

export function usePostContext() {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("usePostContext must be used within PostProvider")
  }

  return context
}
