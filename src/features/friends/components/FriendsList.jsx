import UserCard from "../../../components/common/UserCard"
import { Grid, CircularProgress } from "@mui/material"
import { friend } from '../../../constant/text/vi/friend.text'
import { useFriendshipContext } from '../hooks/useFriendshipContext'
import useAuth from "../../../core/auth/useAuth"
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { routes } from '../../../constant/routes'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ButtonIcon from "../../../components/common/button/IconButton"
import {useBlockContext} from '../../../core/block/hooks/useBlockContext'
/* ===================== UI ===================== */
// Presentational component for rendering friend list UI
function FriendListUI({ friendList, deleteFriend, actorName, loading, isOwner, navigateChecker }) {
  
  // Action button for each friend (delete or loading state)
  function TaskButton({ func, username }) {
    if(!isOwner) return null
    
    if(loading[username]?.delete_friend)
      return <CircularProgress size={20} color="white"/>

    return (
      <ButtonIcon
        icon={PersonRemoveIcon}
        onClick={func}
        title={friend.text_on_friend_list.remove_friend}
      />
    )
  }
  
  return (
    <Grid container spacing={2} width="100%">
      {friendList.map((friend) => (
        <Grid
          xs={6}
          key={friend.username}
          sx={{ display: "flex", width: "49%" }}
        >
          <UserCard
            onClick={() => navigateChecker(routes.profile, friend.username)}
            avatar={friend.avatarUrl}
            username={friend.displayName}
            relationStatus
            tasks={
              actorName !== friend.username
                ? {component: <TaskButton username={friend.username} func={() => deleteFriend(friend.username)}/>}
                : null
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}

/* ===================== CONTAINER ===================== */
// Container component: handles data, state, and conditions
export default function FriendList() {
  const {
    state: { friendList, loading },
    actions: { deleteFriend },
  } = useFriendshipContext()
  const { user, isOwner } = useAuth()

    const {actions:{canNavigateToUser}} = useBlockContext()
  
  // Loading state for fetching friend list
  if (loading.global.get_friend_list) {
    return <LoadingUI message={friend.text_on_friend_list.loading} />
  }

  // Empty list state (owner vs other profile)
  if (friendList.length === 0) {
    return <EmptyListUI message={
      isOwner
        ? friend.text_on_friend_list.empty
        : friend.text_on_friend_list.empty_other
      }
    />
  }
  
  return (
    <FriendListUI
      navigateChecker = {canNavigateToUser}
      isOwner={isOwner}
      friendList={friendList}
      deleteFriend={deleteFriend}
      actorName={user?.username ?? null}
      loading={loading.perFriend}
    />
  )
}
