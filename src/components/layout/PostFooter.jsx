import React from "react";
import { Box, Typography } from "@mui/material";
import ActionButton from "./ActionButton";

import ArrowIcon from "../../assets/icons/arrow.svg?react";
import ChatBubbleIcon from "../../assets/icons/chatbubble.svg?react";
import BookmarkIcon from "../../assets/icons/bookmark.svg?react";
import SendIcon from "../../assets/icons/paperplane.svg?react";

export default function PostFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        mt: 2,
        
      }}
    >
      {/* Upvote/Downvote */}
      <ActionButton
        icon={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
             
            }}
          >
            <ArrowIcon
              style={{
                transform: "rotate(-45deg) translateY(3px)",
              }}
              width={30}
              height={30}
            />
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "1",
                color: "#fff",
              }}
            >
              999+
            </Typography>
            <ArrowIcon
              style={{
                transform: "rotate(135deg) translateY(3px)",
              }}
              width={30}
              height={30}
            />
          </Box>
        }
      />

      {/* Comment */}
      <ActionButton
        icon={<ChatBubbleIcon width={30} height={30} />}
        count="999+"
      />

      {/* Save */}
      <ActionButton
        icon={<BookmarkIcon width={30} height={30} />}
        count="999+"
      />

      {/* Share */}
      <ActionButton
        icon={<SendIcon width={30} height={30} />}
        rounded
      />
    </Box>
  );
}
