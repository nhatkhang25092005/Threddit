import {Avatar, Badge, useTheme, Tooltip} from '@mui/material'
import {style} from '../style'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useProfileContext } from '../hooks';
import useAuth from '../../../core/auth/useAuth';
import ImageInput from '../../../components/common/input/ImageInput';
import { useProfileModal } from '../provider/useProfileModal';
import {usePostContext} from '../../post/hooks/usePostContext'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildStoryRoute } from '../../post/components/story/storyRoute';
export default function ProfileAvatar(){
  const mode = useTheme().palette.mode
  const { state, actions } = useProfileContext()
  const { isOwner } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const {actions:{getCurrentStory}, selector:{story:{isHaveCurrentStory}}} = usePostContext()
  const {openModal} = useProfileModal()
  const handleChangeAvatar = async (e) => {
    const temp = await actions.avatar.presignAvatar(e)
    openModal('confirm_avatar',{src:temp,confirm:actions.avatar.confirmAvatar})
  }
  const haveStory = isHaveCurrentStory(state.username)
  useEffect(()=>{
    getCurrentStory(state.username)},
  [state.username, getCurrentStory])
  
  // Change Avatar Button
  function ChangeAvatarButton(){
    return(
      <Avatar
        sx={{
          display: isOwner ? undefined : 'none',
          bgcolor: 'white',
          width: 40,
          height: 40,
          border: '2px solid black',
          cursor:'pointer',
          transition:'transform ease-in-out 0.1s',
          '&:hover':{transform: 'scale(1.1)'}
        }}
      >
        <ImageInput onClick={handleChangeAvatar}>
          <CameraAltIcon sx={{color:'black'}} />
        </ImageInput>
      </Avatar>
    )
  }

  return(
    <Badge
      overlap="circular"
      badgeContent={<ChangeAvatarButton/>}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar sx={style.header.info_container.bg_avatar(mode)}>
        <Avatar
          sx={{
          width:'9rem',
          height:'9rem',
          background:haveStory ? 'linear-gradient(135deg, #beffe5 0%, #fbf866 50%, #66fb5e 100%)' : 'none'
          }}
        >
          <Tooltip title={haveStory ? 'xem tin' : null} placement='top'>
            <Avatar
              aria-label={haveStory ? 'Open current story' : undefined}
              onClick={() => {
                if (!haveStory || !state.username) return
                navigate(buildStoryRoute('current', state.username), {
                  state: { backgroundLocation: location },
                })
              }}
              onKeyDown={(event) => {
                if (!haveStory || !state.username) return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(buildStoryRoute('current', state.username), {
                    state: { backgroundLocation: location },
                  })
                }
              }}
              role={haveStory ? 'button' : undefined}
              tabIndex={haveStory ? 0 : -1}
              sx={{
                ...style.header.info_container.avatar(haveStory),
                cursor: haveStory ? 'pointer' : 'default'
              }}
              src={state.avatarUrl}
            />
          </Tooltip>
        </Avatar>
      </Avatar>
    </Badge>
  )
}
