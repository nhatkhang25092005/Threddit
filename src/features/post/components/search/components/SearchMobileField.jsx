import { forwardRef } from "react";
import SearchFieldShell from "./SearchFieldShell";

const SearchMobileField = forwardRef(function SearchMobileField(
  { id, value, onChange, onSubmit, onClose, inputRef, isLoading },
  ref
) {
  return (
    <SearchFieldShell
      mobile
      field={{
        containerRef: ref,
        id,
        inputRef,
        isLoading,
        onChange,
        onClose,
        onSubmit,
        value,
      }}
    />
  )
})

export default SearchMobileField
