import { Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { scrollMainToTop } from "../../../../../components/layout/Main/mainScroll.utils";
import { buildProfileRoute } from "../../story/storyRoute";
import { style } from "../style";
import {
  resolveAvatarUrl,
  resolveProfileHandle,
  resolveProfileUsername,
} from "../utils";

export default function ReelProfileAvatar({
  avatarSx,
  avatarUrl,
  buttonSx,
  username,
}) {
  const navigate = useNavigate()
  const profileUsername = resolveProfileUsername(username)
  const profileHandle = resolveProfileHandle(profileUsername)
  const canNavigate = Boolean(profileUsername)

  const handleClick = (event) => {
    event.stopPropagation()

    if (!canNavigate) return

    navigate(buildProfileRoute(profileUsername))

    window.requestAnimationFrame(() => {
      scrollMainToTop(event.currentTarget?.ownerDocument)
    })
  }

  return (
    <Box
      aria-label={canNavigate ? `Mo trang ca nhan ${profileHandle}` : "Anh dai dien"}
      component="button"
      disabled={!canNavigate}
      onClick={handleClick}
      sx={[style.avatarButton, buttonSx]}
      type="button"
    >
      <Avatar src={resolveAvatarUrl(avatarUrl)} sx={avatarSx} />
    </Box>
  )
}
