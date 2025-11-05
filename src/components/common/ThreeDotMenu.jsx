import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Box} from "@mui/material"

export default function ThreeDotMenu({sx, functionList, direction}) {
  const [anchorEl, setAnchorEl] = useState(null);
  if(functionList===null){ 
    console.error("functionList in ThreeDotMenu Component can not be null")
    return
  }
 
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };  
  

  return (
    <Box sx={{...sx}}>
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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          "& .MuiPaper-elevation":{
            marginLeft:"40px",
            bgcolor:"#0A0B0B",
            border:"solid #BCBDBF 1px"
          }
        }}
      >
        {functionList.map(
            item=>(<MenuItem onClick={item.callback}>{item.label}</MenuItem>)
        )}
      </Menu>
    </Box>
  );
}