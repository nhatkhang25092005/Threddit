import { Avatar, Box, ButtonBase, CircularProgress, Divider, Typography } from '@mui/material'
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../../core/auth/useAuth'
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

const buildStoryEntry = ({
  stories = [],
  username = null,
  fallbackAuthor = {},
} = {}) => {
  if (!username) return null

  const sortedStories = sortStoriesByNewest(stories)
  const latestStory = sortedStories[0] || null

  if (!latestStory) return null

  return {
    username,
    displayName: latestStory.author?.displayName || fallbackAuthor?.displayName || username,
    avatarUrl: latestStory.author?.avatarUrl || fallbackAuthor?.avatarUrl || undefined,
    latestStoryId: latestStory.id,
    latestStoryTime: latestStory.time?.createdAt || null,
    storyCount: sortedStories.length,
  }
}

function StorySidebarItem({
  activeUsername,
  entry,
  locationState,
  navigate,
}) {
  const isActive = String(activeUsername || '') === String(entry.username)

  return (
    <ButtonBase
      onClick={() => navigate(
        buildStoryRoute('current', entry.username, entry.latestStoryId),
        {
          replace: true,
          state: locationState,
        }
      )}
      sx={sx.friendSidebarItem(isActive)}
    >
      <Avatar
        src={entry.avatarUrl}
        alt={entry.displayName}
        sx={sx.friendSidebarAvatar(isActive)}
      />

      <Box sx={sx.friendSidebarMeta}>
        <Typography sx={sx.friendSidebarName}>
          {entry.displayName}
        </Typography>
        <Typography sx={sx.friendSidebarUsername}>
          @{entry.username}
        </Typography>
        <Typography sx={sx.friendSidebarTime}>
          {formatStoryTime(entry.latestStoryTime)}
        </Typography>
      </Box>

      <Box sx={sx.friendSidebarBadgeWrap}>
        <Box sx={sx.friendSidebarCountBadge(isActive)}>
          {entry.storyCount}
        </Box>
        <RadioButtonCheckedRoundedIcon sx={sx.friendSidebarDot(isActive)} />
      </Box>
    </ButtonBase>
  )
}

export default function FriendStoryList() {
  const navigate = useNavigate()
  const location = useLocation()
  const { username: activeUsername } = useParams()
  const { user } = useAuth()
  const {
    actions: { getFriendStory },
    selector: {
      story: {
        getCurrentStoryListOf,
        getFriendStoryIdsMap,
        getFriendStoryListOf,
      }
    }
  } = usePostContext()
  const [isFetchingFriendStories, setIsFetchingFriendStories] = useState(false)
  const friendStoryMap = getFriendStoryIdsMap()
  const hasFriendStories = Object.keys(friendStoryMap).length > 0
  const myStories = getCurrentStoryListOf(user?.username)

  useEffect(() => {
    if (hasFriendStories) return

    let mounted = true

    async function fetchFriendStories() {
      setIsFetchingFriendStories(true)
      await getFriendStory()

      if (mounted) {
        setIsFetchingFriendStories(false)
      }
    }

    fetchFriendStories()

    return () => {
      mounted = false
    }
  }, [getFriendStory, hasFriendStories])

  const myStoryEntry = useMemo(() => (
    buildStoryEntry({
      stories: myStories,
      username: user?.username,
      fallbackAuthor: user,
    })
  ), [myStories, user])

  const friendStoryEntries = useMemo(() => {
    return Object.keys(friendStoryMap)
      .map((username) => buildStoryEntry({
        username,
        stories: getFriendStoryListOf(username),
      }))
      .filter(Boolean)
      .sort((left, right) => (
        new Date(right.latestStoryTime || 0) - new Date(left.latestStoryTime || 0)
      ))
  }, [friendStoryMap, getFriendStoryListOf])

  if (
    !isFetchingFriendStories
    && !myStoryEntry
    && friendStoryEntries.length === 0
  ) {
    return null
  }

  return (
    <Box sx={sx.friendSidebar}>
      <Box sx={sx.friendSidebarCard}>
        {myStoryEntry ? (
          <>
            <Typography sx={sx.friendSidebarEyebrow}>Tin của bạn</Typography>

            <Box sx={sx.friendSidebarListSection}>
              <StorySidebarItem
                activeUsername={activeUsername}
                entry={myStoryEntry}
                locationState={location.state}
                navigate={navigate}
              />
            </Box>
          </>
        ) : null}

        {myStoryEntry && friendStoryEntries.length > 0 ? (
          <Divider sx={sx.friendSidebarDivider} />
        ) : null}

        {friendStoryEntries.length > 0 || isFetchingFriendStories ? (
          <>
            <Typography sx={sx.friendSidebarEyebrow}>Tin của bạn bè</Typography>

            <Box sx={sx.friendSidebarList}>
              {isFetchingFriendStories && friendStoryEntries.length === 0 ? (
                <Box sx={sx.friendSidebarLoading}>
                  <CircularProgress size={20} thickness={5} sx={{ color: '#F8FAFC' }} />
                  <Typography sx={sx.friendSidebarLoadingText}>
                    Đang lấy danh sách tin
                  </Typography>
                </Box>
              ) : null}

              {friendStoryEntries.map((friend) => (
                <StorySidebarItem
                  key={friend.username}
                  activeUsername={activeUsername}
                  entry={friend}
                  locationState={location.state}
                  navigate={navigate}
                />
              ))}
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  )
}
