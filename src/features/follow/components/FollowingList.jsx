import { memo } from "react"
import { Grid } from "@mui/material"
import UserCard from "../../../components/common/UserCard"
import useAuth from '../../../hooks/useAuth'
import { follow } from "../../../constant/text/vi/follow.text"
import { useFollowContext } from "../hooks/useFollowContext"
import EmptyListUI from "./EmptyListUI"
import LoadingUI from "./LoadingUI"
import { useNavigate } from "react-router-dom"
import { routes } from "../../../constant/routes"

/* ===================== UI ===================== */

const FollowingListUI = memo(function FollowingListUI({
  list,
  toggleFollow,
  actorName
}) {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2} width="100%">
      {list.map((ele) => {
        const user = ele.followee
        if (!user) return null

        return (
          <Grid item xs={6} key={user.id} sx={{ display: "flex", width: "49%" }}>
            <UserCard
              onClick={() => navigate(`${routes.profile}/${user.username}`) }
              avatar={user.avatarUrl}
              username={user.displayName}
              action={
                actorName !== user.username
                  ? {
                      label: follow.following.unfollow,
                      onClick: () =>toggleFollow(user, ele.canFollow),
                    }
                  : undefined
              }
            />
          </Grid>
        )
      })}
    </Grid>
  )
})

/* ===================== CONTAINER ===================== */

const FollowingList = memo(function FollowingList() {
  const {
    state: { followingList = [], loading },
    actions: { toggleFollow },
  } = useFollowContext()

  const { user } = useAuth()

  if (loading.get_following) {
    return <LoadingUI message={follow.loading.get_following} />
  }

  if (followingList.length === 0) {
    return <EmptyListUI message={follow.empty.following} />
  }

  return (
    <FollowingListUI
      list={followingList}
      toggleFollow={toggleFollow}
      actorName={user.username}
    />
  )
})

export default FollowingList
