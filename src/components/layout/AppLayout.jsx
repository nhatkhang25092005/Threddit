/**
 * AppLayout Component
 * This is the main layout of app
 * @returns
 */

import { Box, Tabs, Tab, Tooltip, Badge, Button } from "@mui/material";
import CircleNotifications from "@mui/icons-material/CircleNotifications";
import PersonIcon from "@mui/icons-material/Person";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "../../assets/icons/home.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import AddIcon from "../../assets/icons/plus.svg?react";
import UserIcon from "../../assets/icons/user.svg?react";
import NotifyIcon from "../../assets/icons/bell.svg?react";
export default function AppLayout({ customStyle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("add");

  const { count } = useNotificationContext();

  const tabs = {
    // Notification Tab
    home: {
      value: "home",
      path: "/app/home",
      icon: <HomeIcon />,
    },
    search: {
      value: "search",
      path: "/app/search",
      icon: <SearchIcon />,
    },
    // {
    //   value: "user",
    //   path: "app/user",
    //   icon: <UserIcon />,
    // },
    add: {
      value: "add",
      path: "/app/add",
      icon: (
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
          }}
        >
          <AddIcon />
        </Box>
      ),
    },
    notification: {
      label: "Thông báo",
      value: "notification",
      path: "/app/notification",
      icon: (
        <Badge
          color="error"
          max={99}
          badgeContent={count}
          invisible={count === 0}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <NotifyIcon fontSize="large" sx={{ color: "#fff" }} />
        </Badge>
      ),
    },

    // Profile Tab
    profile: {
      label: "Thông tin tài khoản",
      value: "profile",
      path: "/app/profile",
      icon: <PersonIcon fontSize="large" sx={{ color: "#fff" }} />,
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabs[newValue].path);
  };

  useEffect(() => {
    const currentTab = Object.keys(tabs).find((key) =>
    location.pathname.startsWith(tabs[key].path)
  );
    currentTab ? setValue(currentTab) : setValue(null)
  }, [location.pathname]);

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "fit-content",
    backgroundColor: "#0f0f0f",
    borderRight: "1px solid #222",
    position: "fixed",
    left: 0,
    top: 0,
    ...customStyle,
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
          value={value || false}
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
                fill: "white", // ép màu trắng cho tất cả path
              },
              "&:hover svg": {
                color: "#fff",
                transform: "scale(1.5)",
              },
            },
            "& .Mui-selected": {
              bgcolor: "#bcbdbf39",
            },
          }}
        >
          {Object.entries(tabs).map(([key, tab]) => (
            <BottomNavigationAction key={key} value={tab.value} icon={tab.icon} />
          ))}
        </BottomNavigation>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
