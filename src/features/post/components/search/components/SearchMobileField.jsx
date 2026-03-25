import { Box, Paper } from "@mui/material";
import { forwardRef } from "react";
import SearchFieldContent from "./SearchFieldContent";
import { style } from "../style";

const SearchMobileField = forwardRef(function SearchMobileField(
  { id, value, onChange, onSubmit, onClose, inputRef, isLoading },
  ref
) {
  return (
    <Paper
      id={id}
      ref={ref}
      component="section"
      variant="navigate"
      sx={(theme) => style.mobileSearchBar(theme)}
      role="search"
    >
      <Box sx={style.mobileSearchInner}>
        <SearchFieldContent
          mobile
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          onClose={onClose}
          inputRef={inputRef}
          isLoading={isLoading}
        />
      </Box>
    </Paper>
  )
})

export default SearchMobileField
