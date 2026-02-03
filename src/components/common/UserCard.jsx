import { Box, Avatar, Typography, Button, useTheme } from '@mui/material';
import Surface from "./Surface";

export default function UserCard({
  relationStatus  = false,
  avatar = null,
  username = 'username',
  tasks = null
}) {
  const theme = useTheme().palette.mode
  return (
    <Surface
      variant="card"
      sx={styles.card}
    >
      {/* Avatar */}
      <Avatar
        src={avatar}
        sx={styles.avatar}
      />

      {/* Text */}
      <Box sx={styles.textWrapper}>
        <Typography variant="subtitle1" sx={styles.username}>
          {username}
        </Typography>
      </Box>

      {tasks && <Button variant='dialog' sx={styles.button(relationStatus, theme)} onClick={tasks.func}>{tasks.label}</Button>}    </Surface>
  );
}

/* ================= STYLES ================= */

const styles = {
  button:(relationStatus, theme)=>({
    height:'fit-content',
    fontSize:'12px',
    textTransform: 'none',
    ...(relationStatus && {
      border: `1px solid ${theme === "dark" ? "#d3d3d3" : "#a7a7a7"}`,
      bgcolor: theme === "dark" ? "#595959" : "#f4f4f4",
    }),
  }),
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    px: '1rem',
    gap: '1rem',
    width: '100%',
    minWidth: 0,
    flex: 1,
    boxSizing: 'border-box',
    alignSelf: 'stretch',
  },
  avatar: {
    width: 56,
    height: 56,
    flexShrink: 0,
  },
  textWrapper: {
    flexGrow: 1,
    minWidth: 0,
  },
  username: {
    fontWeight: 'bold',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subText: {
    color: 'grey.500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
};
