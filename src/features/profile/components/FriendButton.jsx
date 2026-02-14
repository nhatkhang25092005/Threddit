import AcceptRejectButton from '../../friends/components/AcceptRejectButton'
import { useProfileContext } from '../hooks/useProfileContext'
import { useFriendshipContext } from '../../friends/hooks/useFriendshipContext'
import RequestFriendButton from '../../friends/components/RequestFriendButton'
import CancelRequestButton from '../../friends/components/CancelRequestButton'
import UnfriendButton from '../../friends/components/UnfriendButton'

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
    pending_sent:()=><CancelRequestButton/>,
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
  const {
    isOwner,
    state: {friendshipStatus, username }
  } = useProfileContext()

  const {
    state: {loading:{global:loading}},
    actions:{
      requestFriend,
      deleteFriend
    }
  } = useFriendshipContext()

  return (
    <UI
      status={friendshipStatus}
      username = {username}
      hidden={isOwner}
      loading={loading}
      onClick={{
        request:()=>requestFriend(username),
        unfriend:()=>deleteFriend(username, true),
        respond_request:{
          accept:()=>alert('accept'),
          reject:()=>alert('reject')
        }
      }}
    />
  )
}
