import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Paper, Typography } from "@mui/material";
import { searchText } from "../../../../../constant/text/vi/post/search.text";
import { style } from "../style";

export default function SearchPreviewField({
  mobile = false,
  value,
  onClick,
  active = false,
}) {
  const content = typeof value === "string" ? value.trim() : ""

  if (!content) return null

  const rootSx = (theme) => style.searchPreviewSlot({ mobile, active, theme })

  if (mobile) {
    return (
      <Paper
        component="button"
        type="button"
        variant="navigate"
        onClick={onClick}
        sx={rootSx}
      >
        <Box sx={(theme) => style.searchPreviewIcon(theme)}>
          <SearchRoundedIcon />
        </Box>

        <Box sx={style.searchPreviewBody}>
          <Typography sx={(theme) => style.searchPreviewEyebrow(theme)} noWrap>
            {searchText.field.previewEyebrow}
          </Typography>
          <Typography sx={style.searchPreviewValue} noWrap>
            {content}
          </Typography>
        </Box>
      </Paper>
    )
  }

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={rootSx}
    >
      <Box sx={(theme) => style.searchPreviewIcon(theme)}>
        <SearchRoundedIcon />
      </Box>

      <Box sx={style.searchPreviewBody}>
        <Typography sx={(theme) => style.searchPreviewEyebrow(theme)} noWrap>
          {searchText.field.previewEyebrow}
        </Typography>
        <Typography sx={style.searchPreviewValue} noWrap>
          {content}
        </Typography>
      </Box>
    </Box>
  )
}
