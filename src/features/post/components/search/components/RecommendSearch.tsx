import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded"
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import { searchText } from "../../../../../constant/text/vi/post/search.text"
import { style } from "../style"

const resolveUserKey = (user: any, index: number) => (
  user?.username ?? user?.id ?? user?.displayName ?? `search-user-${index}`
)

const resolveUserName = (user: any) => (
  user?.displayName || user?.fullName || user?.username || "User"
)

const resolveUserMeta = (user: any) => {
  const handle = user?.username ? `@${user.username}` : ""
  const bio = typeof user?.bio === "string"
    ? user.bio.trim()
    : typeof user?.description === "string"
      ? user.description.trim()
      : ""

  return [handle, bio].filter(Boolean).join(" | ")
}

const resolveUserQuery = (user: any) => {
  const username = typeof user?.username === "string" ? user.username.trim() : ""
  const displayName = typeof user?.displayName === "string" ? user.displayName.trim() : ""
  const fullName = typeof user?.fullName === "string" ? user.fullName.trim() : ""

  return username || displayName || fullName
}

const resolveContentKey = (item: any, index: number) => (
  item?.id ?? item?._id ?? `${item?.author?.username || "post"}-${index}`
)

const resolveContentTitle = (item: any) => {
  const text = typeof item?.text === "string"
    ? item.text.trim()
    : typeof item?.description === "string"
      ? item.description.trim()
      : ""

  if (text) return text

  const authorName = item?.author?.displayName || item?.author?.username
  return authorName ? `Bai viet cua ${authorName}` : "Mo chi tiet bai viet"
}

const resolveContentMeta = (item: any) => {
  const author = item?.author?.displayName || item?.author?.username
  const stats = item?.stats?.commentNumber != null
    ? `${item.stats.commentNumber} binh luan`
    : ""

  return [author, stats].filter(Boolean).join(" | ")
}

const resolveContentQuery = (item: any) => {
  const text = typeof item?.text === "string" ? item.text.trim() : ""
  const description = typeof item?.description === "string" ? item.description.trim() : ""
  const authorUsername = typeof item?.author?.username === "string"
    ? item.author.username.trim()
    : ""
  const authorName = typeof item?.author?.displayName === "string"
    ? item.author.displayName.trim()
    : ""

  return text || description || authorUsername || authorName
}

interface RecommendSearchProps {
  mobile?: boolean
  recommend?: {
    visible?: boolean
    isLoading?: boolean
    users?: unknown[]
    content?: unknown[]
    empty?: boolean
    onSelect?: (query: string) => void | Promise<unknown>
  }
}

export default function RecommendSearch({
  mobile = false,
  recommend,
}: RecommendSearchProps) {
  const users = Array.isArray(recommend?.users) ? recommend.users : []
  const content = Array.isArray(recommend?.content) ? recommend.content : []

  if (!recommend?.visible) return null

  const handleOpenUser = (user: any) => {
    const selectedQuery = resolveUserQuery(user)
    if (!selectedQuery) return

    void recommend?.onSelect?.(selectedQuery)
  }

  const handleOpenContent = (item: any) => {
    const selectedQuery = resolveContentQuery(item)
    if (!selectedQuery) return

    void recommend?.onSelect?.(selectedQuery)
  }

  return (
    <Box sx={(theme) => style.searchRecommendPanel(theme, mobile)}>
      {recommend.isLoading ? (
        <Box sx={style.searchRecommendStatus}>
          <CircularProgress size={18} thickness={4.4} />
          <Typography sx={(theme) => style.searchRecommendStatusText(theme)}>
            Dang tai goi y...
          </Typography>
        </Box>
      ) : null}

      {!recommend.isLoading && recommend.empty ? (
        <Box sx={style.searchRecommendStatus}>
          <Box sx={(theme) => style.searchRecommendLeadingIcon(theme)}>
            <SearchRoundedIcon />
          </Box>
          <Box sx={style.searchRecommendStatusBody}>
            <Typography sx={style.searchRecommendStatusTitle}>
              Khong tim thay goi y phu hop
            </Typography>
            <Typography sx={(theme) => style.searchRecommendStatusText(theme)}>
              {searchText.page.emptyDescription}
            </Typography>
          </Box>
        </Box>
      ) : null}

      {!recommend.isLoading && users.length > 0 ? (
        <Box sx={style.searchRecommendSection}>
          <Box sx={style.searchRecommendSectionHeader}>
            <Box sx={(theme) => style.searchRecommendLeadingIcon(theme)}>
              <PeopleAltRoundedIcon />
            </Box>
            <Typography sx={style.searchRecommendSectionTitle}>
              {searchText.page.usersSectionTitle(users.length)}
            </Typography>
          </Box>

          <Box sx={style.searchRecommendList}>
            {users.map((user: any, index) => {
              const meta = resolveUserMeta(user)

              return (
                <Box
                  key={`${resolveUserKey(user, index)}-${index}`}
                  component="button"
                  type="button"
                  onClick={() => handleOpenUser(user)}
                  sx={(theme) => style.searchRecommendItem(theme)}
                >
                  <Avatar
                    src={user?.avatarUrl || undefined}
                    sx={style.searchRecommendAvatar}
                  />
                  <Box sx={style.searchRecommendBody}>
                    <Typography sx={style.searchRecommendTitle} noWrap>
                      {resolveUserName(user)}
                    </Typography>
                    {meta ? (
                      <Typography sx={(theme) => style.searchRecommendMeta(theme)} noWrap>
                        {meta}
                      </Typography>
                    ) : null}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      ) : null}

      {!recommend.isLoading && content.length > 0 ? (
        <Box sx={style.searchRecommendSection}>
          <Box sx={style.searchRecommendSectionHeader}>
            <Box sx={(theme) => style.searchRecommendLeadingIcon(theme)}>
              <ArticleRoundedIcon />
            </Box>
            <Typography sx={style.searchRecommendSectionTitle}>
              Noi dung lien quan ({content.length})
            </Typography>
          </Box>

          <Box sx={style.searchRecommendList}>
            {content.map((item: any, index) => {
              const meta = resolveContentMeta(item)

              return (
                <Box
                  key={`${resolveContentKey(item, index)}-${index}`}
                  component="button"
                  type="button"
                  onClick={() => handleOpenContent(item)}
                  sx={(theme) => style.searchRecommendItem(theme)}
                >
                  <Box sx={(theme) => style.searchRecommendLeadingIcon(theme)}>
                    <ArticleRoundedIcon />
                  </Box>
                  <Box sx={style.searchRecommendBody}>
                    <Typography sx={style.searchRecommendTitle} noWrap>
                      {resolveContentTitle(item)}
                    </Typography>
                    {meta ? (
                      <Typography sx={(theme) => style.searchRecommendMeta(theme)} noWrap>
                        {meta}
                      </Typography>
                    ) : null}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
