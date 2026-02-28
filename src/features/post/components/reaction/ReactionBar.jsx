import { Box, IconButton } from "@mui/material";
import { REACTION_META } from "../../../../constant/emoji";
import { style } from "./style";

const sx = style.reactionBar
export default function ReactionBar({ onReact, onMouseEnter, onMouseLeave }) {
  return (
    <Box sx={sx.tray} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {Object.entries(REACTION_META).map(([reaction, value]) => (
        <IconButton
          key={reaction}
          size="small"
          title={value.label}
          aria-label={reaction.label}
          sx={sx.item}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onReact?.(reaction)}
        >
          <Box component="span" sx={sx.emoji}>
            {value.emoji}
          </Box>
        </IconButton>
      ))}
    </Box>
  );
}
