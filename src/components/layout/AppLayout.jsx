/**
 * AppLayout Component
 * This is the main layout of app
 * @returns
 */

import { Box, Tabs, Tab, Tooltip, Badge, Button } from "@mui/material";
import  CircleNotifications from "@mui/icons-material/CircleNotifications";
import  PersonIcon from "@mui/icons-material/Person";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {  useState, useEffect } from "react";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation()

  const {count} = useNotificationContext()
  console.log(count)

  /**
   *  Điền đối tượng thông tin của trang vào đây, bao gồm đường dẫn tuyệt đối, icon sử dụng và nhãn
   * Icon nên lấy trong icons-material, chú ý thiết lập kích cỡ là "large" và màu sắc là #fff
   *  
   * Tham khảo đối tượng đã có sẵn bên dưới
   */

  console.log(count)
  const tabs = [
    // Notification Tab
    { label: "Thông báo", 
      path: "/app/notification", 
      icon : (
      <Badge color="error" max = {99} badgeContent={count} invisible = {count === 0} overlap="circular" anchorOrigin={{vertical:"bottom",horizontal:"right"}}><CircleNotifications fontSize="large" sx={{color:"#fff"}}/></Badge>) },
    
      // Profile Tab
    { label: "Thông tin tài khoản", 
      path: "/app/profile", 
      icon : <PersonIcon fontSize="large" sx={{color:"#fff"}}/> },
  ];  

  
  const [value, setValue] = useState(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabs[newValue].path);
  };

  // eslint 
  useEffect(()=>{
      const currentTab = tabs.findIndex(
      (tab) => location.pathname.startsWith(tab.path)
    );
    setValue(currentTab)

  },[location.pathname])


  return (
    <Box sx={{ display: "flex", height: "100vh"}}>
      <Box sx={{height:"100vh", width: "fit-content", position: "absolute", display:"flex", flexDirection:"column"}}>
        <img src="#" alt="LOGO" style={{width:"150px", height:"50px"}}/>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          textColor="white"
          value={value === -1 ? false : value}
          onChange={handleChange} 
          sx={{my:"auto", 
            "& .MuiTabs-indicator":{
            backgroundColor:value === -1 ? "transparent" : "#fff",
            width:"4px"
          }}}
        >
          {tabs.map((tab, index) => (
            <Tooltip title={tab.label} placement="right" key={index}>
                <Tab icon={tab.icon} sx={{my:"3px"}}/>
            </Tooltip>
          ))}
        </Tabs>
        <Button sx={{height:"50px", width:"fit-content", borderRadius:"150px", mx:"auto", mb:"1rem"}}>
          <MoreVertIcon/>
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
