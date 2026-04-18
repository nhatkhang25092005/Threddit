import SearchFieldShell from "./SearchFieldShell";
import SearchPreviewField from "./SearchPreviewField";

export default function LayoutSearchSlot({
  active = false,
  renderTrigger,
  search,
  variant = "desktop",
}) {
  const isMobile = variant === "mobile"

  if (search.state.isOpen) {
    return (
      <SearchFieldShell
        mobile={isMobile}
        field={search.field}
        recommend={search.recommend}
      />
    )
  }

  if (search.preview.visible) {
    return (
      <SearchPreviewField
        mobile={isMobile}
        value={search.preview.value}
        onClick={search.preview.onOpen}
        active={active}
      />
    )
  }

  return renderTrigger ? renderTrigger({
    active,
    ...search.trigger,
  }) : null
}
