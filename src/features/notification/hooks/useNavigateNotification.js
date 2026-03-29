import { useNavigate } from "react-router-dom"
import { routes } from "../../../constant"
export function useNavigateNotification(onNavigate){
  const navigate = useNavigate()
  const goTo = (target) => {
    switch (target.type){
      case "COMMENT":{
        const params = new URLSearchParams({
          contentId:target.contentId,
          commentId:target.commentId
        })
        navigate(`${routes.home}?${params.toString()}`)
        onNavigate?.()
        return
      }

      case "REPLY_COMMENT":{
        const params = new URLSearchParams({
          contentId:target.contentId,
          commentId:target.commentId,
          isSubComment:true
        })
        navigate(`${routes.home}?${params.toString()}`)
        onNavigate?.()
        return
      }

      case "REACTION_COMMENT":{
        const params = new URLSearchParams({
          contentId:target.contentId,
          commentId:target.commentId
        })
        navigate(`${routes.home}?${params.toString()}`)
        onNavigate?.()
        return
      }

      case "FOLLOW":{
        navigate(`${routes.profile}/${target.actorUsername}`)
        onNavigate?.()
        return
      }

      case "FRIEND_REQUEST":{
        navigate(`${routes.profile}/${target.actorUsername}`)
        onNavigate?.()
        return
      }

      case "FRIEND_CONTENT_CREATION":{
        if(target.contentType === 'story')
          navigate(`/app/stories/current/${target.actorUsername}/${target.contentId}`)
        else {
          const params = new URLSearchParams({
            contentId:target.contentId
          })
          navigate(`${routes.profile}/${target.actorUsername}?${params.toString()}`)
        }
        onNavigate?.()
        return
      }
    }
  }
  
  return goTo
}
