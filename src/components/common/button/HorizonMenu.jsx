import { useState } from 'react';
import {MenuItem, Menu, Box, IconButton, useTheme} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function HorizonMenu({sx, tasks, onClose, className, anchorOrigin, transformOrigin}){
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    onClose?.()
    setAnchorEl(null);
  };

  return (
    <Box sx={{...sx}} className = {className}>
      <IconButton
        disableRipple
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius:'50%',
          width:'fit-content',
          height:'fit-content',
          padding:0,
          px:0,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`
        }}
      >
        <MoreHorizIcon sx={{margin:'0px', fontSize:'2rem'}}/>
      </IconButton>
      
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        variant='default'
      >
        {tasks.map(task=>
          <MenuItem key={task.label} onClick={async ()=>{
            await task.func()
            handleClose()
            }}>
            {task.label}
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}