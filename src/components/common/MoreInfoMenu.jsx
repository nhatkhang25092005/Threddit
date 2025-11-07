import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, replace } from 'react-router-dom';
import {LABEL,ROUTES} from "../../constant"
import { handleSignoutRequest } from '../../services/request/authRequest';

export default function PositionedMenu({sx}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };  

  const handleNavigate = (path) => {
    setAnchorEl(null);
    path ? navigate(path) : undefined
  }

  const handleLogOut = async () => {
    const response = await handleSignoutRequest()
    if(response.isOk) {
      localStorage.clear()
      navigate(ROUTES.LOGIN, replace)
    }
    setAnchorEl(null)
  }

  return (
    <div style={{...sx}}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </Button>
      
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          "& .MuiPaper-elevation":{
            bgcolor:"#0A0B0B",
            marginLeft:"80px",
            border:"solid #BCBDBF 1px"
          }
        }}
      >
        <MenuItem onClick={()=>handleNavigate("/app/profile")}>{LABEL.PROFILE}</MenuItem>
        <MenuItem onClick={()=>handleNavigate("/app/change_password")}>{LABEL.CHANGE_PASSWORD}</MenuItem> 
        <MenuItem onClick={handleLogOut}>{LABEL.LOGOUT}</MenuItem>
      </Menu>
    </div>
  );
}