import UserCard from "../../../components/common/UserCard"
import { Grid } from "@mui/material"
import { follow } from '../../../constant/text/vi/follow.text'
import { useFollowContext } from '../hooks/useFollowContext'
import useAuth from "../../../core/auth/useAuth"
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { useBlockContext } from "../../../core/block/hooks/useBlockContext"
import {routes} from '../../../constant/routes'
/* ===================== UI ===================== */

function FollowerListUI({ followerList, toggleFollow, actorName, navigateChecker }) {
  return (
    <Grid container spacing={2} width="100%">
      {followerList.map(({ follower, canFollow }) => (
        <Grid
          xs={6}
          key={follower.username}
          sx={{ display: "flex", width: "49%" }}
        >
          <UserCard
            key={follower.username}
            onClick={()=>navigateChecker(routes.profile, follower.username)}
            avatar={follower.avatarUrl}
            username={follower.displayName}
            relationStatus={canFollow}
            tasks={
              actorName !== follower.username
                ? {
                    label: canFollow
                      ? follow.follower.start_follow_label
                      : follow.follower.unfollow_label,
                    func: () => toggleFollow(follower, canFollow),
                  }
                : null
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}

/* ===================== CONTAINER ===================== */

export default function FollowerList() {
  const {
    state: { followerList = [], loading },
    actions: { toggleFollow },
  } = useFollowContext()


  const {actions:{canNavigateToUser}} = useBlockContext()

  const { user } = useAuth()

  if (loading.get_follower) {
    return <LoadingUI message={follow.loading.get_follower}/>
  }

  if (followerList.length === 0) {
    return <EmptyListUI message={follow.empty.follower}/>
  }

  return (
    <FollowerListUI
      navigateChecker = {canNavigateToUser}
      followerList={followerList}
      toggleFollow={toggleFollow}
      actorName={user.username}
    />
  )
}
