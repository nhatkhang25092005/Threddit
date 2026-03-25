import AcceptRejectButton from '../../friends/components/AcceptRejectButton'
import { useProfileContext } from '../hooks/useProfileContext'
import { useFriendshipContext } from '../../friends/hooks/useFriendshipContext'
import RequestFriendButton from '../../friends/components/RequestFriendButton'
import CancelRequestButton from '../../friends/components/CancelRequestButton'
import UnfriendButton from '../../friends/components/UnfriendButton'
import useAuth from '../../../core/auth/useAuth'

function UI({ status, hidden, loading, onClick }) {
  // Do not render button if hidden is true (the page owner is the user)
  if(hidden) return null
  const normalizedStatus = status ?? 'no_friend'

  const buttonActions = {
    no_friend: ()=>(
      <RequestFriendButton
        loading={loading.request_friend}
        onClick={()=>onClick.request()}
      />
    ),
    pending_sent:() => (
      <CancelRequestButton
        loading={loading.cancel_request}
        onClick={() => onClick.cancel_request()}
      />
    ),
    accepted:()=>(
      <UnfriendButton
        loading={loading.unfriend}
        onClick={()=>onClick.unfriend()}
      />
    ),
    pending_received:()=><AcceptRejectButton/>
  }[normalizedStatus]

  return buttonActions()
}

export default function FriendButton() {
  const { isOwner } = useAuth()
  const {
    state: {friendshipStatus, username }
  } = useProfileContext()

  const {
    state: {
      loading: {
        global: globalLoading,
        perRequest,
      }
    },
    actions:{
      cancelRequest,
      requestFriend,
      deleteFriend
    }
  } = useFriendshipContext()

  return (
    <UI
      status={friendshipStatus}
      hidden={isOwner}
      loading={{
        request_friend: globalLoading.request_friend,
        unfriend: globalLoading.unfriend,
        cancel_request: perRequest?.[username]?.cancel_request ?? false,
      }}
      onClick={{
        cancel_request:()=>cancelRequest(username, true),
        request:()=>requestFriend(username),
        unfriend:()=>deleteFriend(username, true)
      }}
    />
  )
}
