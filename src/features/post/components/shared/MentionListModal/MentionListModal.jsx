import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Portal,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import TagItem from "./TagItem";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Surface from "../../../../../components/common/Surface";
import { useFriendshipContext as useFriendContext } from "../../../../friends/hooks/useFriendshipContext";
import { useCallback, useMemo, useRef } from "react";
import { style } from "../style";
import {getDefaultMentions, insertMentionsToTextarea } from "./helper";

import { useMentionPicker } from "./useMentionPicker";
import { useClose } from "./useClose";

const sx = style.mentionList;
export default function MentionListModal({ onClose, mention }) {
  const {
    state: { myFriendList = [] },
  } = useFriendContext();
  useClose(onClose, mention?.close)
  const defaultMentionsRef = useRef(getDefaultMentions(mention?.value))
  const {handlePick, friendsByUsername, setQuery, query, filteredFriends} = useMentionPicker(mention?.value, myFriendList, defaultMentionsRef.current)

  const chosenFriends = useMemo(() => {
    return Object.values(friendsByUsername).filter((f) => f.isChoose).map(item=>item.username);
  }, [friendsByUsername]);

  const handleDone = useCallback(() => {
    insertMentionsToTextarea(mention, chosenFriends, defaultMentionsRef.current);
    onClose?.();
  }, [mention, chosenFriends, onClose]);

  return (
    <Portal>
      <Box sx={sx.overlay} onClick={onClose}>
        <Surface
          variant="modal"
          sx={sx.panel}
          onClick={(event) => event.stopPropagation()}
        >
          <Box sx={sx.header}>
            <Typography sx={sx.title}>Tag ban be</Typography>
            <IconButton
              aria-label="Dong danh sach tag"
              onClick={onClose}
              sx={sx.closeButton}
            >
              <CloseIcon sx={{ fontSize: "1.15rem" }} />
            </IconButton>
          </Box>

          <Box sx={sx.divider} />

          <Box sx={sx.body}>
            <TextField
              size="small"
              fullWidth
              placeholder="Tìm bạn bè..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              sx={sx.search}
              autoFocus
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={sx.searchIcon} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Box
              sx={sx.chosenFriends}
            >
              <Box component="span" sx={{ mr: 1 }}>
                Đã tag:
              </Box>
              {chosenFriends.map((username) => (
                <TagItem key={username} username={username} />
              ))}
            </Box>

            <Box sx={sx.list}>
              {filteredFriends.length === 0 ? (
                <Typography sx={sx.empty}>Khong tim thay ban be phu hop.</Typography>
              ) : (
                filteredFriends.map((username) => (
                  <Box
                    key={username}
                    role="button"
                    tabIndex={0}
                    sx={sx.row}
                    onClick={() => handlePick(username)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handlePick(username);
                      }
                    }}
                  >
                    <Checkbox color="white" checked={!!friendsByUsername[username].isChoose} />
                    <Avatar src={friendsByUsername[username].avatarUrl} sx={sx.avatar} />

                    <Box sx={sx.meta}>
                      <Typography sx={sx.name}>{friendsByUsername[username].displayName}</Typography>
                      <Typography sx={sx.username}>@{friendsByUsername[username].username}</Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            <Box sx={sx.footer}>
              <Button variant="primary" sx={sx.doneButton} onClick={handleDone}>
                Xong
              </Button>
            </Box>
          </Box>
        </Surface>
      </Box>
    </Portal>
  );
}
