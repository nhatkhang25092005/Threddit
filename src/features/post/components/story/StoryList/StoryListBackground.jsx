import { Box } from '@mui/material'
import { style } from '../style'

const sx = style.storyList

export default function StoryListBackground() {
  return (
    <>
      <Box sx={sx.orb('-7rem', '-5rem', '#47C8A84D')} />
      <Box sx={sx.orb('58%', '10%', '#6A7CFF42')} />
    </>
  )
}
