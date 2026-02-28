import {
  OVERLAY_BASE_STYLE,
  ROW_BASE_STYLE,
  AVATAR_BOX_STYLE,
  TEXT_WRAP_STYLE,
  DISPLAY_NAME_STYLE,
  USERNAME_STYLE
} from './style'
import {Box, Avatar} from '@mui/material'

export default function MentionOverlay({ open, anchor, users, activeIndex, onPick }) {
  if (!open || users.length === 0) return null;

  return (
    <div style={{ ...OVERLAY_BASE_STYLE, top: anchor.top, left: anchor.left }}>
      {users.map((user, index) => {
        const isActive = index === activeIndex;

        return (
          <Box
            key={user.id}
            onMouseDown={(event) => {
              event.preventDefault();
              onPick(user);
            }}
            sx={{
              ...ROW_BASE_STYLE,
              background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
              "&:hover": {
                backgroundColor:  "rgba(158, 158, 158, 0.12)" ,
              },
            }}
          >
            <div style={AVATAR_BOX_STYLE}>
              {user.avatarUrl ? (
                <Avatar
                  alt={user.displayName}
                  src={user.avatarUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : null}
            </div>

            <div style={TEXT_WRAP_STYLE}>
              <div style={DISPLAY_NAME_STYLE}>{user.displayName}</div>
              <div style={USERNAME_STYLE}>@{user.username}</div>
            </div>
          </Box>
        );
      })}
    </div>
  );
}