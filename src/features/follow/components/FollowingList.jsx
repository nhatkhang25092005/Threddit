import { memo, useMemo } from "react"
import { Grid } from "@mui/material"
import UserCard from "../../../components/common/UserCard"
import useAuth from '../../../hooks/useAuth'
import { follow } from "../../../constant/text/vi/follow.text"
import { useFollowContext } from "../hooks/useFollowContext"
import EmptyListUI from "./EmptyListUI"
import LoadingUI from "./LoadingUI"

/* ===================== UI ===================== */

const FollowingListUI = memo(function FollowingListUI({
  list,
  toggleFollow,
  actorName
}) {
  const renderList = useMemo(() => {
    if (!list || list.length === 0) return null

    return list.map((ele) => {
      const user = ele.followee
      if (!user) return null

      return (
        <Grid
          item
          xs={6}
          key={user.id}
          sx={{ display: "flex", width: "49%" }}
        >
          <UserCard
            avatar={user.avatarUrl}
            username={user.displayName}
            tasks={
              actorName !== user.username
                ? {
                    label: follow.following.unfollow,
                    func: () => toggleFollow(user, ele.canFollow),
                  }
                : undefined
            }
          />
        </Grid>
      )
    })
  }, [list, toggleFollow, actorName])

  return (
    <Grid container spacing={2} width="100%">
      {renderList}
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

  // ===== loading state =====
  if (loading.get_following) {
    return <LoadingUI message={follow.loading.get_following}/>
  }

  // ===== empty state =====
  if (followingList.length === 0) {
    return <EmptyListUI message={follow.empty.following}/>
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
