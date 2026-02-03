import { useCallback } from 'react'
import { useNotify } from '../../../hooks/useNotify'
import { services } from '../services'
import { orchestrate } from '../../../utils/orchestrate'
import { useProfileContext } from '../../profile/hooks/useProfileContext'
import { useFollowContext } from './useFollowContext'

export function useDomainFollow() {
  const notify = useNotify()
  const {actions: { profileSync } } = useProfileContext()
  const {actions: { followSync } } = useFollowContext()

  const toggleFollowOnProfile = useCallback(
    async (username, actor, isFollowing) => {

      const action = isFollowing ? services.unfollowUser : services.followUser

      return orchestrate({
        service: async () => await notify.withLoading(
          () => action(username),
          (bool) => profileSync.setFollowLoading(bool)
        ),

        onSuccess: [
          () => isFollowing ? profileSync.unfollowSuccess() : profileSync.followSuccess(),
          () => isFollowing ? followSync.removeFollower(actor) : followSync.addFollower({createdAt: new Date().toISOString(),follower: actor}),
          (res) => notify.snackbar(res.message, 3000)
        ],

        onError: [(res) => notify.snackbar(res?.message || (isFollowing ? 'Bỏ theo dõi thất bại' : 'Theo dõi thất bại'))]
      })
    },
    [notify, profileSync, followSync]
  )

  return {
    toggleFollowOnProfile,
  }
}
