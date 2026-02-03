import { useCallback } from "react"
import { loading, following, follower} from "../actions"
import { useNotify } from "../../../hooks/useNotify"
import { services } from "../services"

export function useFollow(dispatch){
  const notify = useNotify()
  const toggleFollow = useCallback(async (target, canFollow) => {
    const action = canFollow ? services.followUser : services.unfollowUser
      const res = await notify.withLoading(
        () => action(target.username),
        (bool) => loading.follow(bool)
      )

      if (res?.success) {
        dispatch(follower.updateCanFollow(target.username, !canFollow))
        dispatch(canFollow ? following.add({createdAt:new Date().toISOString(), followee:target}) : following.remove(target))
        notify.snackbar(res.message, 3000)
      }
      else notify.snackbar(res?.message || (canFollow ?'Theo dõi thất bại' : 'Bỏ theo dõi thất bại' ))
    },
    [notify, dispatch]
  )

  return {toggleFollow}
}