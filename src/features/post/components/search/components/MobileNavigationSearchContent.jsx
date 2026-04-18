import LayoutSearchSlot from "./LayoutSearchSlot";

export default function MobileNavigationSearchContent({
  active = false,
  search,
}) {
  return (
    <LayoutSearchSlot
      active={active}
      search={search}
      variant="mobile"
    />
  )
}
