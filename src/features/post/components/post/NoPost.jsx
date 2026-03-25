import { Box, Typography } from "@mui/material";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { style } from "./style";
import Surface from "../../../../components/common/Surface";

const noPostSx = style.noPost;

export default function NoPost({ message, sx = {} }) {
  const content =
    typeof message === "string" && message.trim()
      ? message
      : "No posts to show yet.";

  return (
    <Surface sx={[noPostSx.wrapper, sx.wrapper]}>
      <Box sx={[noPostSx.glow, sx.glow]} />

      <Box sx={[noPostSx.card, sx.card]}>
        <Box sx={[noPostSx.iconWrap, sx.iconWrap]}>
          <Box sx={[noPostSx.iconBadge, sx.iconBadge]}>
            <ForumOutlinedIcon sx={[noPostSx.mainIcon, sx.mainIcon]} />
          </Box>
          <AutoAwesomeIcon sx={[noPostSx.sparkleLeft, sx.sparkleLeft]} />
          <AutoAwesomeIcon sx={[noPostSx.sparkleRight, sx.sparkleRight]} />
        </Box>

        <Typography sx={[noPostSx.title, sx.title]}>
          {"\u1ede \u0111\u00e2y c\u00f3 v\u1ebb tr\u1ed1ng tr\u1ea3i"}
        </Typography>
        <Typography sx={[noPostSx.message, sx.message]}>{content}</Typography>
      </Box>
    </Surface>
  );
}
