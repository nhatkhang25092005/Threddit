import UserCard from "../../../components/common/UserCard"
import { Grid, CircularProgress } from "@mui/material"
import { friend } from "../../../constant/text/vi/friend.text"
import { useFriendshipContext } from "../hooks/useFriendshipContext"
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { useNavigate } from "react-router-dom"
import { routes } from "../../../constant/routes"
import CancelIcon from "@mui/icons-material/Cancel"
import IconButton from "../../../components/common/button/IconButton"
import ContainerForList from './ContainerForList.jsx'
/* ===================== UI ===================== */

function SentListUI({
  sentList,
  cancelRequest,
  loadingCancel,
}) {
  const navigate = useNavigate()
  const sentTasks = (friendshipId) => ([
    {component:
      loadingCancel[friendshipId]?.cancel_request ? (
        <CircularProgress color="white" key={`cancel-loading-${friendshipId}`} size={20} />
      ) : (
        <IconButton
          key={`cancel-${friendshipId}`}
          icon={CancelIcon}
          title={friend.text_on_sent_list?.button?.cancel_request || "Cancel request"}
          onClick={() => cancelRequest(friendshipId)}
        />
      )
    }
  ])

  return (
    <Grid container spacing={2} width="100%">
      {sentList.map(({recipient, friendshipId}) => (
        <Grid
          key={recipient.username}
          item
          xs={6}
          sx={{ display: "flex", width: "49%" }}
        >
          <UserCard
            onClick={() =>
              navigate(`${routes.profile}/${recipient.username}`)
            }
            avatar={recipient.avatarUrl}
            username={recipient.displayName}
            relationStatus="sent"
            tasks={sentTasks(friendshipId)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

/* ===================== CONTAINER ===================== */

export default function SentList() {
  const {
    state: { sentList, loading, sentCount },
    actions: { cancelRequest },
  } = useFriendshipContext()

  if (loading.global.get_sent_list) {
    return (
      <LoadingUI
        message={
          friend.text_on_sent_list?.loading || "Loading sent requests..."
        }
      />
    )
  }

  if (sentList.length === 0) {
    return (
      <EmptyListUI
        message={
          friend.text_on_sent_list?.empty || "No sent requests"
        }
      />
    )
  }

  return (
    <ContainerForList
      loading = {loading.global.get_sent_number}
      text = {`${sentCount}${friend.text_on_sent_list.sent_count}`}
    >
      <SentListUI
        sentList={sentList}
        cancelRequest={cancelRequest}
        loadingCancel={loading.perRequest}
      />
    </ContainerForList>
  )
}
