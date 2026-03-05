import { Box, Typography } from "@mui/material"
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import { style } from "./style"
import Surface from "../../../../components/common/Surface"

const sx = style.noPost

export default function NoPost({ message }) {
  const content = typeof message === "string" && message.trim()
    ? message
    : "No posts to show yet."

  return (
    <Surface sx={sx.wrapper}>
      <Box sx={sx.glow} />

      <Box sx={sx.card}>
        <Box sx={sx.iconWrap}>
          <Box sx={sx.iconBadge}>
            <ForumOutlinedIcon sx={sx.mainIcon} />
          </Box>
          <AutoAwesomeIcon sx={sx.sparkleLeft} />
          <AutoAwesomeIcon sx={sx.sparkleRight} />
        </Box>

        <Typography sx={sx.title}>Ở đây có vẻ trống trải</Typography>
        <Typography sx={sx.message}>{content}</Typography>
      </Box>
    </Surface>
  )
}
