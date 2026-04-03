import { Box, Typography } from "@mui/material";
import { style } from "../style";

export default function NavButton({
  active = false,
  buttonRef = null,
  expanded = false,
  mobile = false,
  onClick,
  searchFieldId,
  searchOpen = false,
  searchTrigger = false,
  tab,
}) {
  const isEmphasized = tab.value === "add"
  const isStatic = Boolean(tab.isStatic)
  const IconComponent = tab.Icon

  return (
    <Box
      component="button"
      type="button"
      ref={buttonRef}
      aria-current={!searchTrigger && active ? "page" : undefined}
      aria-label={tab.label}
      aria-controls={searchTrigger && searchOpen ? searchFieldId : undefined}
      aria-expanded={searchTrigger ? searchOpen : undefined}
      aria-pressed={searchTrigger ? searchOpen : undefined}
      onClick={onClick}
      sx={[
        mobile
          ? style.mobileNavButton(active, isEmphasized)
          : style.navButton(active, expanded, isEmphasized),
        isStatic
          ? {
              cursor: "default",
              "&:hover": {
                transform: "none",
                opacity: mobile ? 0.82 : 0.8,
              },
            }
          : null,
      ]}
    >
      <Box sx={style.navIconWrap(active, isEmphasized)}>
        {IconComponent ? <IconComponent {...(tab.iconProps || {})} /> : null}
      </Box>

      {!mobile && expanded ? (
        <Typography sx={style.navLabel}>{tab.label}</Typography>
      ) : null}
    </Box>
  )
}
