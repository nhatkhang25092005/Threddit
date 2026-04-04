import { useNavigate } from "react-router-dom"
import { routes } from "../../../constant"
import useAuth from "../../../core/auth/useAuth"
import {
  buildProfileRoute,
  buildStoryRoute,
} from "../../post/components/story/storyRoute"

const buildQueryString = (params) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === false || value === "") return
    searchParams.set(key, String(value))
  })

  return searchParams.toString()
}

const buildHomeRoute = ({ contentId = null, commentId = null, isSubComment = false } = {}) => {
  const queryString = buildQueryString({ contentId, commentId, isSubComment })
  return queryString ? `${routes.home}?${queryString}` : routes.home
}

const isStoryContent = (contentType) => (
  String(contentType || "").trim().toLowerCase().includes("story")
)

export function useNavigateNotification(onNavigate){
  const navigate = useNavigate()
  const { user } = useAuth()

  const buildProfileTarget = (actorUsername, params = {}) => {
    const basePath = actorUsername && actorUsername !== user?.username
      ? buildProfileRoute(actorUsername)
      : routes.profile

    const queryString = buildQueryString(params)
    return queryString ? `${basePath}?${queryString}` : basePath
  }

  const goTo = (target = {}) => {
    switch (target.type){
      case "COMMENT":
      case "REACTION_COMMENT":
      case "MENTION_IN_COMMENT":{
        navigate(buildHomeRoute({
          contentId: target.contentId,
          commentId: target.commentId,
        }))
        onNavigate?.()
        return
      }

      case "REPLY_COMMENT":{
        navigate(buildHomeRoute({
          contentId: target.contentId,
          commentId: target.commentId,
          isSubComment: true,
        }))
        onNavigate?.()
        return
      }

      case "REACTION_CONTENT":
      case "MENTION_IN_CONTENT":{
        navigate(buildHomeRoute({
          contentId: target.contentId,
        }))
        onNavigate?.()
        return
      }

      case "FOLLOW":
      case "FRIEND_REQUEST":
      case "FRIEND_ACCEPTED":{
        navigate(buildProfileTarget(target.actorUsername))
        onNavigate?.()
        return
      }

      case "FOLLOWING_CONTENT_CREATION":
      case "FRIEND_CONTENT_CREATION":{
        if (isStoryContent(target.contentType)) {
          navigate(buildStoryRoute("current", target.actorUsername, target.contentId))
        } else {
          navigate(buildProfileTarget(target.actorUsername, {
            contentId: target.contentId,
          }))
        }
        onNavigate?.()
        return
      }

      default:{
        if (target.commentId || target.contentId) {
          navigate(buildHomeRoute({
            contentId: target.contentId,
            commentId: target.commentId,
          }))
        } else if (target.actorUsername) {
          navigate(buildProfileTarget(target.actorUsername))
        }

        onNavigate?.()
      }
    }
  }
  
  return goTo
}
