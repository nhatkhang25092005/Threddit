import { Box } from "@mui/material";
import { forwardRef } from "react";
import SearchFieldContent from "./SearchFieldContent";
import { style } from "../style";

const SearchSidebarField = forwardRef(function SearchSidebarField(
  { id, value, onChange, onSubmit, onClose, inputRef, isLoading },
  ref
) {
  return (
    <Box id={id} ref={ref} sx={style.searchSlot} role="search">
      <SearchFieldContent
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={onClose}
        inputRef={inputRef}
        isLoading={isLoading}
      />
    </Box>
  )
})

export default SearchSidebarField
