import { Avatar, Box, ButtonBase, CircularProgress, Typography } from '@mui/material'
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePostContext } from '../../../hooks'
import { buildStoryRoute } from '../storyRoute'
import { style } from '../style'

const sx = style.storyList

const formatStoryTime = (createdAt) => {
  if (!createdAt) return 'Vừa xong'

  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return 'Vừa xong'

  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  })
}

const sortStoriesByNewest = (stories = []) => (
  [...stories].sort((left, right) => (
    new Date(right?.time?.createdAt || 0) - new Date(left?.time?.createdAt || 0)
  ))
)

export default function FriendStoryList() {
  const navigate = useNavigate()
  const location = useLocation()
  const { username: activeUsername } = useParams()
  const {
    actions: { getFriendStory },
    selector: {
      story: {
        getFriendStoryIdsMap,
        getFriendStoryListOf,
      }
    }
  } = usePostContext()
  const [isFetching, setIsFetching] = useState(false)
  const friendStoryMap = getFriendStoryIdsMap()
  const hasFriendStories = Object.keys(friendStoryMap).length > 0

  useEffect(() => {
    if (hasFriendStories) return

    let mounted = true

    async function fetchFriendStories() {
      setIsFetching(true)
      await getFriendStory()

      if (mounted) {
        setIsFetching(false)
      }
    }

    fetchFriendStories()

    return () => {
      mounted = false
    }
  }, [getFriendStory, hasFriendStories])

  const friendStoryEntries = useMemo(() => {
    return Object.keys(friendStoryMap)
      .map((username) => {
        const stories = sortStoriesByNewest(getFriendStoryListOf(username))
        const latestStory = stories[0] || null

        if (!latestStory) return null

        return {
          username,
          displayName: latestStory.author?.displayName || username,
          avatarUrl: latestStory.author?.avatarUrl || undefined,
          latestStoryId: latestStory.id,
          latestStoryTime: latestStory.time?.createdAt || null,
          storyCount: stories.length,
        }
      })
      .filter(Boolean)
      .sort((left, right) => (
        new Date(right.latestStoryTime || 0) - new Date(left.latestStoryTime || 0)
      ))
  }, [friendStoryMap, getFriendStoryListOf])

  if (!isFetching && friendStoryEntries.length === 0) return null

  return (
    <Box sx={sx.friendSidebar}>
      <Box sx={sx.friendSidebarCard}>
        <Typography sx={sx.friendSidebarEyebrow}>Tin của bạn bè</Typography>

        <Box sx={sx.friendSidebarList}>
          {isFetching && friendStoryEntries.length === 0 ? (
            <Box sx={sx.friendSidebarLoading}>
              <CircularProgress size={20} thickness={5} sx={{ color: '#F8FAFC' }} />
              <Typography sx={sx.friendSidebarLoadingText}>
                Đang lấy danh sách tin
              </Typography>
            </Box>
          ) : null}

          {friendStoryEntries.map((friend) => {
            const isActive = String(activeUsername || '') === String(friend.username)

            return (
              <ButtonBase
                key={friend.username}
                onClick={() => navigate(
                  buildStoryRoute('current', friend.username, friend.latestStoryId),
                  {
                    replace: true,
                    state: location.state,
                  }
                )}
                sx={sx.friendSidebarItem(isActive)}
              >
                <Avatar
                  src={friend.avatarUrl}
                  alt={friend.displayName}
                  sx={sx.friendSidebarAvatar(isActive)}
                />

                <Box sx={sx.friendSidebarMeta}>
                  <Typography sx={sx.friendSidebarName}>
                    {friend.displayName}
                  </Typography>
                  <Typography sx={sx.friendSidebarUsername}>
                    @{friend.username}
                  </Typography>
                  <Typography sx={sx.friendSidebarTime}>
                    {formatStoryTime(friend.latestStoryTime)}
                  </Typography>
                </Box>

                <Box sx={sx.friendSidebarBadgeWrap}>
                  <Box sx={sx.friendSidebarCountBadge(isActive)}>
                    {friend.storyCount}
                  </Box>
                  <RadioButtonCheckedRoundedIcon sx={sx.friendSidebarDot(isActive)} />
                </Box>
              </ButtonBase>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
