import { Box, Typography } from '@mui/material'
import { style } from '../style'

const sx = style.storyList

export default function StoryListEmptyState({ isFetching }) {
  return (
    <Box sx={sx.emptyState}>
      <Typography sx={sx.emptyTitle}>
        {isFetching ? 'Dang tai story...' : 'Khong tim thay story'}
      </Typography>
      <Typography sx={sx.emptyText}>
        {isFetching
          ? 'Dang dong bo danh sach story cho trang nay.'
          : 'Nguoi dung nay hien khong co story de hien thi.'}
      </Typography>
    </Box>
  )
}
