import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useTheme } from "@mui/material/styles"

/**
 * Icon
 *
 * Theme-aware icon wrapper.
 * Renders a custom icon if provided, otherwise falls back to `MoreVertIcon`.
 *
 * @component
 *
 * @param {Object} props
 *
 * @param {React.ComponentType} [props.Icon]
 * Optional icon component to render.
 * Must be a valid MUI icon or React SVG component.
 *
 * @returns {JSX.Element}
 *
 * @example
 * <Icon />
 *
 * @example
 * <Icon Icon={SettingsIcon} />
 *
 * @notes
 * - Icon color is automatically adjusted based on current theme mode.
 * - When no Icon is provided, `MoreVertIcon` is used as fallback.
 */
export default function Icon({ Icon = null }) {
  const theme = useTheme()

  const iconColor = theme.palette.mode === "dark" ? "#fff" : "#000"

  return Icon ? (
    <Icon />
  ) : (
    <MoreVertIcon sx={{ color: iconColor }} />
  )
}
