import { Box, Skeleton } from "@mui/material"
import { style } from "./style"

const sx = style.loadingGetPost

const createLoadingList = (count) => Array.from({ length: count })

export default function LoadingGetPost({ count = 2 }) {
  return (
    <Box sx={sx.list}>
      {createLoadingList(count).map((_, index) => (
        <Box key={index} sx={sx.card}>
          <Box sx={sx.header}>
            <Skeleton variant="circular" animation="wave" sx={sx.avatar} />
            <Box sx={sx.authorMeta}>
              <Skeleton variant="text" animation="wave" sx={sx.displayName} />
              <Skeleton variant="text" animation="wave" sx={sx.subMeta} />
            </Box>
          </Box>

          <Box sx={sx.body}>
            <Skeleton variant="text" animation="wave" sx={sx.lineWide} />
            <Skeleton variant="text" animation="wave" sx={sx.lineMedium} />
            <Skeleton variant="text" animation="wave" sx={sx.lineShort} />
          </Box>

          <Box sx={sx.mediaWrap}>
            <Skeleton variant="rounded" animation="wave" sx={sx.mediaMain} />
            <Box sx={sx.mediaSide}>
              <Skeleton variant="rounded" animation="wave" sx={sx.mediaSub} />
              <Skeleton variant="rounded" animation="wave" sx={sx.mediaSub} />
            </Box>
          </Box>

          <Box sx={sx.reactionRow}>
            <Skeleton variant="text" animation="wave" sx={sx.reactionLeft} />
            <Skeleton variant="text" animation="wave" sx={sx.reactionRight} />
          </Box>

          <Box sx={sx.actionRow}>
            <Skeleton variant="rounded" animation="wave" sx={sx.actionItem} />
            <Skeleton variant="rounded" animation="wave" sx={sx.actionItem} />
            <Skeleton variant="rounded" animation="wave" sx={sx.actionItem} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}
