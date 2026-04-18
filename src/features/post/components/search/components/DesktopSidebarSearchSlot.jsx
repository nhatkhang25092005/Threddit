import LayoutSearchSlot from "./LayoutSearchSlot";

export default function DesktopSidebarSearchSlot({
  active = false,
  search,
  renderTrigger,
}) {
  return (
    <LayoutSearchSlot
      active={active}
      search={search}
      renderTrigger={renderTrigger}
    />
  )
}
