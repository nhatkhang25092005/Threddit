import { Box } from "@mui/material";
import { useRef } from "react";

export default function MediaInput({multiple, accept, onChange, children, sx }) {
  const inputRef = useRef(null);
  const isMultiple = multiple
  const handleOpenFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <Box sx={sx}>
      <input
        multiple = {isMultiple}
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
