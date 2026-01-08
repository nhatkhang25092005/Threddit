/**
 * AppLayout Component
 * This is the main layout of app
 * @returns
 */

import { Box, Badge,Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNotificationContext } from "../../../hooks/useNotificationContext";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "../../../assets/icons/home.svg?react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import AddIcon from "../../../assets/icons/plus.svg?react";
import NotifyIcon from "../../../assets/icons/bell.svg?react";
import PositionedMenu from "./components/PositionedMenu"
import { style } from "./style";
import {ThemeToggleBtn} from '../../common/button'
import Logo from '../../common/Logo'

import { useMenu } from "./hooks/useMenu";

const EXTEND_WIDTH = '20vw'
const COLLAPSE_WIDTH = '8vw'
const DELAY = 300

const useHoverEffect = () => {
  const [expand, setExpand] = useState(false)
  const hoverTime = useRef(null)
  return {
    expand, setExpand, hoverTime
  }
}

export default function AppLayout({ customStyle }) {
  const {expand, setExpand, hoverTime} = useHoverEffect()
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("add");

  const menuTasks = useMenu()

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
    user: {
      value: "user",
      path: "/app/user",
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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Paper
        variant="navigate"
        sx={{
          width: expand ? EXTEND_WIDTH : COLLAPSE_WIDTH,
          transition:'width 0.1s ease',
          ...customStyle,
        }}
        onMouseEnter={()=>{
          hoverTime.current = setTimeout(()=>{
            setExpand(true)
          }, DELAY)
        }}

        onMouseLeave = {()=>{
          clearTimeout(hoverTime.current)
          setExpand(false)
        }}
      >
        <Logo size={'normal'} sx={style.logo}/>
        <BottomNavigation
          value={value || false}
          onChange={handleChange}
          sx={{
            flexDirection: "column",
            width: "100%",
            height: "70%",
            alignItems:'flex-start',
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
        <ThemeToggleBtn sx={{width:'fit-content'}}/>
        <PositionedMenu sx={{marginTop:"30px"}} tasks={menuTasks} onClose = {()=>setExpand(false)}/>
      </Paper>
      <Box sx={{flexGrow: 1, overflow: "auto", height:'100%', pt:'2rem', display:'flex',justifyContent:'center'}}>
        <Outlet />
      </Box>
    </Box>
  );
}
