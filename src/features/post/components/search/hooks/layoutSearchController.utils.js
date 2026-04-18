import { SEARCH_FIELD_ID } from "../utils";

export function resolveQueryFromLocation({
  pathname,
  search,
  searchPath,
}) {
  if (!pathname.startsWith(searchPath)) {
    return ""
  }

  return new URLSearchParams(search).get("q")?.trim() ?? ""
}

export function createLayoutSearchController({
  close,
  fieldRef,
  handleChange,
  handleSubmit,
  hasValue,
  isLoading,
  isOpen,
  open,
  query,
  toggle,
  triggerRef,
  recommend,
  handleRecommendSelect,
  value,
}) {
  const state = {
    hasValue,
    isLoading,
    isOpen,
    query,
    value,
  }

  return {
    actions: {
      close,
      open,
      selectRecommend: handleRecommendSelect,
      submit: handleSubmit,
      toggle,
    },
    recommend: {
      ...recommend,
      onSelect: handleRecommendSelect,
    },
    close,
    field: {
      containerRef: fieldRef,
      id: SEARCH_FIELD_ID,
      isLoading,
      onChange: handleChange,
      onClose: () => close(),
      onSubmit: handleSubmit,
      value,
    },
    fieldId: SEARCH_FIELD_ID,
    fieldRef,
    handleChange,
    handleSubmit,
    hasValue,
    isLoading,
    isOpen,
    open,
    preview: {
      onOpen: open,
      value,
      visible: !isOpen && hasValue,
    },
    query,
    state,
    trigger: {
      buttonRef: triggerRef,
      searchFieldId: SEARCH_FIELD_ID,
      searchOpen: isOpen,
    },
    toggle,
    triggerRef,
    value,
  }
}
