import { IconButton, TextField } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import { searchText } from "../../../../../constant/text/vi/post/search.text";
import { style } from "../style";

export default function SearchFieldContent({
  mobile = false,
  value,
  onChange,
  onSubmit,
  onClose,
  inputRef,
  isLoading = false,
}) {
  const handleKeyDown = (event) => {
    if (event.key !== "Enter") return

    event.preventDefault()
    onSubmit?.()
  }

  return (
    <>
      <IconButton
        type="button"
        aria-label={searchText.field.submitAriaLabel}
        onClick={onSubmit}
        disabled={isLoading}
        sx={style.searchLeadingIcon}
      >
        <SearchIcon />
      </IconButton>

      <TextField
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        size="small"
        autoComplete="off"
        autoFocus
        disabled={isLoading}
        placeholder={searchText.field.placeholder}
        inputProps={{ "aria-label": searchText.field.keywordAriaLabel }}
        sx={style.searchInput({ mobile })}
      />

      <IconButton
        type="button"
        aria-label={searchText.field.closeAriaLabel}
        onClick={onClose}
        sx={style.searchCloseButton}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </>
  )
}
