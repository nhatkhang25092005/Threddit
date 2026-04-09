import { Avatar, Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { scrollMainToTop } from "../../../../../components/layout/Main/mainScroll.utils";
import { friend } from "../../../../../constant/text/vi/friend.text";
import { useFriendshipContext } from "../../../../friends/hooks/useFriendshipContext";
import { buildProfileRoute } from "../../story/storyRoute";
import { style } from "../style";

const sx = style.friend_chat_list;

function FriendRow({ item }) {
  const navigate = useNavigate()
  const username = item?.username || null;
  const displayName = item?.displayName || username || "User";

  if (!username) return null;

  const handleClick = (event) => {
    navigate(buildProfileRoute(username))

    window.requestAnimationFrame(() => {
      scrollMainToTop(event.currentTarget?.ownerDocument)
    })
  }

  return (
    <ButtonBase onClick={handleClick} sx={sx.item}>
      <Avatar src={item?.avatarUrl || undefined} sx={sx.avatar} />
      <Box sx={sx.textWrap}>
        <Typography sx={sx.displayName}>{displayName}</Typography>
        <Typography sx={sx.username}>@{username}</Typography>
      </Box>
    </ButtonBase>
  );
}

export default function FriendChatList() {
  const {
    state: { myFriendList, friendList, loading },
  } = useFriendshipContext();

  const friends = myFriendList.length > 0 ? myFriendList : friendList;
  const isLoading = loading?.global?.get_friend_list && friends.length === 0;

  return (
    <Box sx={sx.container}>
      <Box sx={sx.inner}>
        <Box sx={sx.header}>
          <Box sx={sx.headerRow}>
            <Typography sx={sx.title}>
              {friend.text_on_profile.status.friend}
            </Typography>
            <Box sx={sx.count}>{friends.length}</Box>
          </Box>
        </Box>

        {friends.length > 0 ? (
          <Box sx={sx.list}>
            {friends.map((item) => (
              <FriendRow key={item.username} item={item} />
            ))}
          </Box>
        ) : (
          <Box sx={sx.status}>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography sx={sx.statusText}>
                {friend.text_on_friend_list.empty}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
