import UserCard from "../../../components/common/UserCard"
import { Grid } from "@mui/material"
import { friend } from '../../../constant/text/vi/friend.text'
import { useFriendshipContext } from '../hooks/useFriendshipContext'
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { useNavigate } from "react-router-dom"
import { routes } from '../../../constant/routes'
/* ===================== UI ===================== */
// Presentational component for rendering mutual list UI
function MutualListUI({ mutualList }) {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2} width="100%">
      {mutualList.map(({ friend: mutualFriend }) => (
        <Grid
          item
          xs={6}
          key={mutualFriend.username}
          sx={{ display: "flex", width: "49%" }}
        >
          <UserCard
            onClick={() => navigate(`${routes.profile}/${mutualFriend.username}`)}
            avatar={mutualFriend.avatarUrl}
            username={mutualFriend.displayName}
            relationStatus
            tasks={null}
          />
        </Grid>
      ))}
    </Grid>
  )
}

/* ===================== CONTAINER ===================== */
// Container component: handles data, state, and conditions
export default function MutualList() {
  const {
    state: { mutualList, loading },
  } = useFriendshipContext()

  // Loading state for fetching mutual list
  if (loading.global.get_mutual_list) {
    return <LoadingUI message={friend.text_on_mutual_list.loading} />
  }

  // Empty list state
  if (mutualList.length === 0) {
    return <EmptyListUI message={
      friend.text_on_mutual_list.empty
    }
    />
  }

  return (
    <MutualListUI
      mutualList={mutualList}
    />
  )
}
