import { Box } from "@mui/material";
import ArrowIcon from "../../../../src/assets/icons/arrow.svg?react";
import { memo } from "react";

const arrowButtonStyle = {
  p: "4px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "transparent",
  "&:hover": { bgcolor: "#1b1b1b" },
  transition: "background-color 0.2s ease",
};

const scoreStyle = {
  minWidth: 30,
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#ffffff",
};

const voteButtonStyle = {
  display: "flex",
  alignItems: "center",
  px: "1.2rem",
  bgcolor: "#302F30",
  borderRadius: "50px",
};

const VoteButton = memo(({ voteState, score, onVote }) => {
  return (
    <Box sx={voteButtonStyle}>
      <Box onClick={() => onVote(true)} sx={arrowButtonStyle}>
        <ArrowIcon
          style={{
            transform: "rotate(-45deg)",
            width: 24,
            height: 24,
            color: voteState.isUpvote === true ? "#4CAF50" : "#A0A0A0",
            transition: "color 0.2s ease",
          }}
        />
      </Box>
      <Box sx={scoreStyle}>{score}</Box>
      <Box onClick={() => onVote(false)} sx={arrowButtonStyle}>
        <ArrowIcon
          style={{
            transform: "rotate(135deg)",
            width: 24,
            height: 24,
            color: voteState.isUpvote === false ? "#F44336" : "#A0A0A0",
            transition: "color 0.2s ease",
          }}
        />
      </Box>
    </Box>
  );
})
VoteButton.displayName = "VoteButton"
export default VoteButton
