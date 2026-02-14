import { useCallback } from "react"
import UserCard from "../../../components/common/UserCard"
import { Grid, CircularProgress} from "@mui/material"
import { friend } from "../../../constant/text/vi/friend.text"
import { useFriendshipContext } from "../hooks/useFriendshipContext"
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { useNavigate } from "react-router-dom"
import { routes } from "../../../constant/routes"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import IconButton from "../../../components/common/button/IconButton"
import ContainerForList from './ContainerForList'
/* ===================== UI ===================== */
function RequestListUI({
  perRequestLoading,
  requestList,
  acceptRequest,
  rejectRequest,
}) {
  const navigate = useNavigate()

  const requestTasks = useCallback(
    (requester, friendshipId) => {
      const loading = perRequestLoading?.[friendshipId]

      return [
        {
          component: loading?.accept_request ? (
            <CircularProgress size={20} color="white" />
          ) : (
            <IconButton
              icon={PersonAddIcon}
              title={friend.text_on_request_list.button.accept_request}
              onClick={() => acceptRequest(requester, friendshipId)}
            />
          ),
        },
        {
          component: loading?.reject_request ? (
            <CircularProgress size={20} color="white" />
          ) : (
            <IconButton
              icon={RemoveCircleOutlineIcon}
              title={friend.text_on_request_list.button.reject_request}
              onClick={() => rejectRequest(friendshipId)}
            />
          ),
        },
      ]
    },
    [perRequestLoading, acceptRequest, rejectRequest]
  )

  return (
      <Grid container spacing={2} width="100%">
        {requestList.map(({ requester, friendshipId }) => (
          <Grid
            key={friendshipId}
            item
            xs={6}
            sx={{ display: "flex", width: "49%" }}
          >
            <UserCard
              onClick={() =>
                navigate(
                  `${routes.profile}/${requester.username}`
                )
              }
              avatar={requester.avatarUrl}
              username={requester.displayName}
              relationStatus="request"
              tasks={requestTasks(
                requester,
                friendshipId
              )}
            />
          </Grid>
        ))}
      </Grid>
  )
}

/* ===================== CONTAINER ===================== */

export default function RequestList() {
  const {
    state: { requestList, loading, requestCount },
    actions: { acceptRequest, rejectRequest },
  } = useFriendshipContext()

  if (loading.global.get_request_list) {
    return (
      <LoadingUI
        message={
          friend.text_on_request_list.loading
        }
      />
    )
  }

  if (requestList.length === 0) {
    return (
      <EmptyListUI
        message={
          friend.text_on_request_list.empty
        }
      />
    )
  }

  return (
    <ContainerForList
      loading = {loading.global.get_request_number}
      text = {`${requestCount}${friend.text_on_request_list.request_count}`}
    >
      <RequestListUI
        perRequestLoading={loading.perRequest}
        requestList={requestList}
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
      />
    </ContainerForList>
  )
}
