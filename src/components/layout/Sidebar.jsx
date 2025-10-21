import * as React from "react";
import { Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "../../assets/icons/home.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import AddIcon from "../../assets/icons/plus.svg?react";
import UserIcon from "../../assets/icons/user.svg?react";
import NotifyIcon from "../../assets/icons/bell.svg?react";

export default function ColumnNavigation({ customStyle }) {
  const [value, setValue] = React.useState("add");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "5%",
    backgroundColor: "#0f0f0f",
    borderRight: "1px solid #222",
    position: "fixed",
    left: 0,
    top: 0,
    ...customStyle,
  };

  return (
    <Box sx={style}>
      <Box
        sx={{
          width: 60,
          height: 60,
          backgroundColor: "#cfcfcf",
          my: "7px",

        }}
      />

      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          flexDirection: "column",
          width: "100%",
          height: "70%",
          backgroundColor: "transparent",
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            color: "#ffffffff",
            "& svg": {
              width: 40,
              minWidth: "auto",
              height: 40,
              minHeight: "auto",
              transition: "0.2s",
              fill: "white !important", // ép màu trắng cho tất cả path
              stroke: "white !important",
              
            },
            "&:hover svg": {
              color: "#fff",
              transform: "scale(1.5)",
            },
          },
        }}
      >
        <BottomNavigationAction value="home" icon={<HomeIcon />} />
        <BottomNavigationAction value="search" icon={<SearchIcon />} />
<BottomNavigationAction
  value="add"
  icon={
    <Box
      sx={{
        width: "70px",
        minWidth: "auto",
        height: "50px",
        minHeight: "auto",
        bgcolor: "#2b2b2b",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr: "4px",
      }}
    >
      <AddIcon />
    </Box>
  }
/>
        <BottomNavigationAction value="user" icon={<UserIcon />} />
        <BottomNavigationAction value="notify" icon={<NotifyIcon />} />
        
        </BottomNavigation>
    </Box>
  );
}
