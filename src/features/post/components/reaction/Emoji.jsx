import { Box, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";
import MoodIcon from "@mui/icons-material/Mood";
import {EMOJI} from '../../../../constant/emoji'
import Surface from "../../../../components/common/Surface";
import { style } from "./style";

const sx = style.emoji;

const insertEmojiAtCaret = (emojiChar, mention) => {
  const textarea = mention.bind?.ref?.current;
  const currentValue = mention.value || "";

  if (!textarea) {
    mention.setValue(`${currentValue}${emojiChar}`);
    return;
  }

  const start = typeof textarea.selectionStart === "number"
    ? textarea.selectionStart
    : currentValue.length;
  const end = typeof textarea.selectionEnd === "number"
    ? textarea.selectionEnd
    : start;
  const nextValue = `${currentValue.slice(0, start)}${emojiChar}${currentValue.slice(end)}`;

  mention.setValue(nextValue);

  requestAnimationFrame(() => {
    const nextCaret = start + emojiChar.length;
    textarea.focus();
    textarea.setSelectionRange(nextCaret, nextCaret);
    mention.bind?.onSelect?.();
  });
}

export default function Emoji({mention}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  };
  return (
    <Box sx={sx.root}>
      <MoodIcon
        onMouseDown={ (event) => event.preventDefault()}
        onClick={(e) => handleOpen(e)}
        sx={sx.icon}
      />

      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        slotProps={{
          paper: {
            sx: sx.emojiPopoverPaper
          }
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'top',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={sx.popover}
      >
        <Surface sx={sx.emojiPicker}>
          <Typography sx={sx.emojiPickerTitle}>Chọn biểu cảm</Typography>
          <Box sx={sx.emojiTypeFlex}>
            {Object.entries(EMOJI).map(([type, emojis]) => (
              <Box sx={sx.emojiTypeItem}>
                <Typography>{type}</Typography>
                <Box sx={sx.emojiGrid}>
                  {emojis.map(emoji => (
                  <IconButton
                    key={emoji.char}
                    aria-label={emoji.label}
                    title={emoji.label}
                    size="small"
                    sx={sx.emojiButton}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => insertEmojiAtCaret(emoji.char, mention)}
                  >
                    <Box component="span" sx={sx.emojiChar}>
                      {emoji.char}
                    </Box>
                  </IconButton>))}
                </Box>
              </Box>
            ))}
          </Box>
        </Surface>
      </Popover>
    </Box>
  );
}
