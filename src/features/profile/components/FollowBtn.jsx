import { Button, CircularProgress, Box, Tooltip } from '@mui/material'
import { style } from '../style'
import { useProfileContext } from '../hooks/useProfileContext'
import { useDomainFollow} from '../../follow/hooks/useDomainFollow'
import {follow} from '../../../constant/text/vi/follow.text'

const sx = style.header.info_container.follow_button

function UI({isFollowing, hidden, loading, onClick}){
  return(
    <Tooltip title = {isFollowing ? follow.tool_tip.follow : follow.tool_tip.unfollow} placement="top">
      <Button
        variant={isFollowing ? 'secondary' : 'primary'}
        sx={{...sx.btn_container,display:hidden ? 'none' : 'inline-flex'}}
        disabled={loading.follow}
        onClick={onClick}
      >
        {loading.follow ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={14} color='white'/>
            {isFollowing ? follow.button.profile_follow_loading_unfollow : follow.button.profile_follow_loading_follow}
          </Box>
        ) : (
          isFollowing ? follow.status.following : follow.status.not_following
        )}
      </Button>
    </Tooltip>
  )
}


export default function FollowBtn() {
  const {
    isOwner,
    state: {
      loading,
      username,
      isFollowing
    }
  } = useProfileContext()

  const {toggleFollowOnProfile} = useDomainFollow()
  const actor =JSON.parse(localStorage.getItem('actor') || 'null')

  return (
    <UI
      isFollowing = {isFollowing}
      hidden = {isOwner}
      username = {username}
      loading={loading}
      onClick = {() => toggleFollowOnProfile(username, Object(actor), isFollowing)}
    />
  )
}
