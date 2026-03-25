import { Box, Typography } from "@mui/material";
import { style } from "../style";
import { resolveProfileHandle, resolveProfileUsername } from "../utils";
import ReelProfileAvatar from "./ReelProfileAvatar";

export default function ReelHeader({ author }) {
  const profileUsername = resolveProfileUsername(author?.username)
  const displayName = author?.displayName || profileUsername || "Nguoi dung"
  const username = resolveProfileHandle(profileUsername)

  return (
    <Box sx={style.header}>
      <Box sx={style.authorRow}>
        <ReelProfileAvatar
          avatarSx={style.avatar}
          avatarUrl={author?.avatarUrl}
          username={author?.username}
        />

        <Box sx={style.authorMeta}>
          <Typography sx={style.authorName}>
            {displayName}
          </Typography>

          {username ? (
            <Typography sx={style.subMeta}>
              {username}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}
