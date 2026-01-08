import { useThemeContext } from "../../../../theme/ThemeContext"
import MoreVertIcon from "@mui/icons-material/MoreVert"

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
  const { mode } = useThemeContext()

  const iconColor = mode === "dark" ? "#fff" : "#000"

  return Icon ? (
    <Icon />
  ) : (
    <MoreVertIcon sx={{ color: iconColor }} />
  )
}
