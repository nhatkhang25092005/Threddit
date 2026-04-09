import { Avatar, Badge, Box, Typography } from "@mui/material";

export type ChatRoom = {
  name: string;
  lastMessage?: string;
  unreadCount?: number;
  avatarUrl?: string;
};

export type ChatListItemProps = {
  room: ChatRoom;
};

const sx  = {
  container:{
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    px: 2,
    py: 1.5,
    borderBottom: "1px solid",
    borderColor: "divider",
  }
}

export default function ChatListItem({ room }: ChatListItemProps) {
  const previewText = room.lastMessage ?? "No message yet";
  const unreadCount = room.unreadCount ?? 0;
  const avatarFallback = room.name.charAt(0).toUpperCase();

  return (
    <Box sx={sx.container}>
      <Badge
        color="primary"
        badgeContent={unreadCount}
        invisible={unreadCount <= 0}
      >
        <Avatar src={room.avatarUrl}>{avatarFallback}</Avatar>
      </Badge>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="subtitle2">{room.name}</Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {previewText}
        </Typography>
      </Box>
    </Box>
  );
}
