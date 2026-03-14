import { Box, Typography } from '@mui/material'
import { style } from '../style'

const sx = style.storyList

export default function StoryListEmptyState({ isFetching }) {
  return (
    <Box sx={sx.emptyState}>
      <Typography sx={sx.emptyTitle}>
        {isFetching ? 'Đang tải story...' : 'Không tìm thấy'}
      </Typography>
      <Typography sx={sx.emptyText}>
        {isFetching
          ? 'Đang đồng bộ danh sách tin.'
          : 'Người dùng này hiện không có tin nào.'}
      </Typography>
    </Box>
  )
}
