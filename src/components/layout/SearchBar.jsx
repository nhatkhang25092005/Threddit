import { Box, InputBase } from "@mui/material";
import SearchIcon from "../../assets/icons/search.svg?react"; 

export default function SearchBar({
  placeholder = "Tìm kiếm",
  icon = <SearchIcon />,
  onChange,
  value,
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#000000ff",
        border: "1px solid #555",
        borderRadius: "8px",
        px: 1.5,
        py: 0.5,
        width: "80%",
        transition: "0.2s",
        "&:focus-within": {
          borderColor: "#888",
        },
        ...sx,
      }}
    >
      <Box 
      sx={{ 
        fill: "white !important", 
        stroke: "white !important",
        mr: 1, 
        display: "flex", 
        alignItems: "center", 
        width: 45, 
        height:45,
        }}>
        {icon}
      </Box>
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        sx={{
          flex: 1,
          color: "#fff",
          fontWeight: "bold",
          "& input::placeholder": {
            color: "#bbb",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}
