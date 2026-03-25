import { Box, Button, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { story } from '../../../../../constant/text/vi/story'
import { style } from '../style'

const sx = style.storyList

export default function StoryListHeader({ onClose, pageMeta, username }) {
  return (
    <Box sx={sx.header}>
      <Box sx={sx.headerText}>
        <Typography sx={sx.eyebrow}>{pageMeta.eyebrow}</Typography>
        <Typography sx={sx.title}>
          {pageMeta.title}{username ? ` | @${username}` : ''}
        </Typography>
        <Typography sx={sx.subtitle}>{pageMeta.subtitle}</Typography>
      </Box>

      <Button
        onClick={onClose}
        startIcon={<CloseRoundedIcon />}
        sx={sx.closeButton}
      >
        {story.shared.closeButton}
      </Button>
    </Box>
  )
}
