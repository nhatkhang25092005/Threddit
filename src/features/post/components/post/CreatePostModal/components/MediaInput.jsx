import { Box } from "@mui/material";
import { useRef } from "react";

export default function MediaInput({ accept, onChange, children, sx }) {
  const inputRef = useRef(null);

  const handleOpenFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <Box sx={sx}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        accept={accept}
        onChange={onChange}
      />
      <Box onClick={handleOpenFilePicker}>{children}</Box>
    </Box>
  );
}
