import UserCard from "../../../components/common/UserCard"
import { Grid, CircularProgress } from "@mui/material"
import { friend } from "../../../constant/text/vi/friend.text"
import { useFriendshipContext } from "../hooks/useFriendshipContext"
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { routes } from "../../../constant/routes"
import CancelIcon from "@mui/icons-material/Cancel"
import IconButton from "../../../components/common/button/IconButton"
import ContainerForList from './ContainerForList'
import { useBlockContext } from "../../../core/block/hooks/useBlockContext"
/* ===================== UI ===================== */

function SentListUI({
  sentList,
  cancelRequest,
  loadingCancel,
  navigateChecker
}) {
  const sentTasks = (username) => ([
    {component:
      loadingCancel[username]?.cancel_request ? (
        <CircularProgress color="white" key={`cancel-loading-${username}`} size={20} />
      ) : (
        <IconButton
          key={`cancel-${username}`}
          icon={CancelIcon}
          title={friend.text_on_sent_list?.button?.cancel_request || "Cancel request"}
          onClick={() => cancelRequest(username)}
        />
      )
    }
  ])

  return (
    <Grid container spacing={2} width="100%">
      {sentList.map(({recipient}) => (
        <Grid
          key={recipient.username}
          xs={6}
          sx={{ display: "flex", width: "49%" }}
        >
          <UserCard
            onClick={() =>
              navigateChecker(routes.profile, recipient.username)
            }
            avatar={recipient.avatarUrl}
            username={recipient.displayName}
            relationStatus="sent"
            tasks={sentTasks(recipient.username)}
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

    const {actions:{canNavigateToUser}} = useBlockContext()

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
        navigateChecker = {canNavigateToUser}
        sentList={sentList}
        cancelRequest={cancelRequest}
        loadingCancel={loading.perRequest}
      />
    </ContainerForList>
  )
}
