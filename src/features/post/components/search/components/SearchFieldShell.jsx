import { Box, Paper } from "@mui/material";
import RecommendSearch from "./RecommendSearch";
import SearchFieldContent from "./SearchFieldContent";
import { style } from "../style";

export default function SearchFieldShell({
  field,
  recommend,
  mobile = false,
}) {
  if (!field) return null

  const content = (
    <Box sx={style.searchFieldStack}>
      <Box sx={style.searchFieldRow}>
        <SearchFieldContent
          mobile={mobile}
          field={field}
        />
      </Box>
      <RecommendSearch
        mobile={mobile}
        recommend={recommend}
      />
    </Box>
  )

  if (mobile) {
    return (
      <Paper
        id={field.id}
        ref={field.containerRef}
        component="section"
        variant="navigate"
        sx={(theme) => style.mobileSearchBar(theme)}
        role="search"
      >
        <Box sx={style.mobileSearchInner}>
          {content}
        </Box>
      </Paper>
    )
  }

  return (
    <Box
      id={field.id}
      ref={field.containerRef}
      sx={(theme) => style.searchSlot(theme)}
      role="search"
    >
      {content}
    </Box>
  )
}
