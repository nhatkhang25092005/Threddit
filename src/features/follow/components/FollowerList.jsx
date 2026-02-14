import UserCard from "../../../components/common/UserCard"
import { Grid } from "@mui/material"
import { follow } from '../../../constant/text/vi/follow.text'
import { useFollowContext } from '../hooks/useFollowContext'
import useAuth from "../../../hooks/useAuth"
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { useNavigate } from "react-router-dom"
import {routes} from '../../../constant/routes'

/* ===================== UI ===================== */

function FollowerListUI({ followerList, toggleFollow, actorName }) {
  const navigate = useNavigate()
  return (
    <Grid container spacing={2} width="100%">
      {followerList.map(({ follower, canFollow }) => (
        <Grid
          item
          xs={6}
          key={follower.username}
          sx={{ display: "flex", width: "49%" }}
        >
          <UserCard
            onClick={()=>navigate(`${routes.profile}/${follower.username}`)}
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

  const { user } = useAuth()

  if (loading.get_follower) {
    return <LoadingUI message={follow.loading.get_follower}/>
  }

  if (followerList.length === 0) {
    return <EmptyListUI message={follow.empty.follower}/>
  }

  return (
    <FollowerListUI
      followerList={followerList}
      toggleFollow={toggleFollow}
      actorName={user.username}
    />
  )
}
