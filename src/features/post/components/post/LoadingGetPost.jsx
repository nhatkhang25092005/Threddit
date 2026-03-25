import { Box, Skeleton } from "@mui/material"
import { style } from "./style"

const createLoadingList = (count) => Array.from({ length: count })
const loadingSx = style.loadingGetPost

export default function LoadingGetPost({ sx = {}, count = 2 }) {
  return (
    <Box sx={[loadingSx.list, sx.list]}>
      {createLoadingList(count).map((_, index) => (
        <Box key={index} sx={[loadingSx.card, sx.card]}>
          <Box sx={[loadingSx.header, sx.header]}>
            <Skeleton variant="circular" animation="wave" sx={[loadingSx.avatar, sx.avatar]} />
            <Box sx={[loadingSx.authorMeta, sx.authorMeta]}>
              <Skeleton variant="text" animation="wave" sx={[loadingSx.displayName, sx.displayName]} />
              <Skeleton variant="text" animation="wave" sx={[loadingSx.subMeta, sx.subMeta]} />
            </Box>
          </Box>

          <Box sx={[loadingSx.body, sx.body]}>
            <Skeleton variant="text" animation="wave" sx={[loadingSx.lineWide, sx.lineWide]} />
            <Skeleton variant="text" animation="wave" sx={[loadingSx.lineMedium, sx.lineMedium]} />
            <Skeleton variant="text" animation="wave" sx={[loadingSx.lineShort, sx.lineShort]} />
          </Box>

          <Box sx={[loadingSx.mediaWrap, sx.mediaWrap]}>
            <Skeleton variant="rounded" animation="wave" sx={[loadingSx.mediaMain, sx.mediaMain]} />
            <Box sx={[loadingSx.mediaSide, sx.mediaSide]}>
              <Skeleton variant="rounded" animation="wave" sx={[loadingSx.mediaSub, sx.mediaSub]} />
              <Skeleton variant="rounded" animation="wave" sx={[loadingSx.mediaSub, sx.mediaSub]} />
            </Box>
          </Box>

          <Box sx={[loadingSx.reactionRow, sx.reactionRow]}>
            <Skeleton variant="text" animation="wave" sx={[loadingSx.reactionLeft, sx.reactionLeft]} />
            <Skeleton variant="text" animation="wave" sx={[loadingSx.reactionRight, sx.reactionRight]} />
          </Box>

          <Box sx={[loadingSx.actionRow, sx.actionRow]}>
            <Skeleton variant="rounded" animation="wave" sx={[loadingSx.actionItem, sx.actionItem]} />
            <Skeleton variant="rounded" animation="wave" sx={[loadingSx.actionItem, sx.actionItem]} />
            <Skeleton variant="rounded" animation="wave" sx={[loadingSx.actionItem, sx.actionItem]} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}
