import { Box, Typography } from "@mui/material";
import { style } from "./style";
import ChatZone from "./ChatZone";
import ChatRoomList from "./ChatRoomList";

export default function ChatPage() {
  return (
    <Box sx={style.page}>
      <Box component="section" sx={style.surface}>
        <ChatZone />
        <ChatRoomList />
      </Box>
    </Box>
  );
}
