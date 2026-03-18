import { Avatar, Box, Skeleton } from "@mui/material";
import { style } from "../style";

const sx = style.list;

export default function CommentListSkeleton() {
  return (
    <Box sx={sx.skeletonList}>
      {[0, 1, 2].map((item) => (
        <Box key={item} sx={sx.skeletonRow}>
          <Avatar sx={sx.skeletonAvatar} />
          <Box sx={sx.skeletonBubble}>
            <Skeleton sx={sx.skeletonLinePrimary} variant="rounded" />
            <Skeleton sx={sx.skeletonLineSecondary} variant="rounded" />
            <Skeleton sx={sx.skeletonLineShort} variant="rounded" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
