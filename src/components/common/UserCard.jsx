import { Box, Avatar, Typography } from '@mui/material';
import Surface from "./Surface";
import HorizonMenu from './button/HorizonMenu';

const DEFAULT_TASKS = [
  { label: 'test1', func: () => alert('hello') }
];

export default function UserCard({
  avatar = null,
  togetherFriendNum = null,
  username = 'username',
  tasks = DEFAULT_TASKS
}) {
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
        {togetherFriendNum !== null && (
          <Typography variant="body2" sx={styles.subText}>
            {togetherFriendNum}
          </Typography>
        )}
      </Box>

      {/* Menu */}
      <HorizonMenu tasks={tasks} />
    </Surface>
  );
}

/* ================= STYLES ================= */

const styles = {
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
    bgcolor: 'red',
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
