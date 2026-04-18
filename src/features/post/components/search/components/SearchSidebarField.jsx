import { forwardRef } from "react";
import SearchFieldShell from "./SearchFieldShell";

const SearchSidebarField = forwardRef(function SearchSidebarField(
  { id, value, onChange, onSubmit, onClose, inputRef, isLoading },
  ref
) {
  return (
    <SearchFieldShell
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

export default SearchSidebarField
