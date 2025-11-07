import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Box} from "@mui/material"
/**
 * ThreeDotMenu Component
 * 
 * A reusable 3-dot menu component using Material-UI's Button and Menu components.
 * It displays a dropdown menu when the user clicks on the three-dot icon.
 * 
 * @component
 * @example
 * // Example usage:
 * const menuItems = [
 *   { label: "Edit", icon: <EditIcon />, callback: () => console.log("Edit clicked") },
 *   { label: "Delete", icon: <DeleteIcon />, callback: () => console.log("Delete clicked") },
 * ];
 * 
 * <ThreeDotMenu
 *   sx={{ color: 'white' }}
 *   functionList={menuItems}
 *   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
 *   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
 * />
 * 
 * @param {Object} props - Component props.
 * @param {Object} [props.sx] - Optional system style overrides (MUI `sx` prop).
 * @param {Array<{label: string, icon: JSX.Element, callback: function}>} props.functionList - 
 *   The list of menu items to display. Each item must contain:
 *   - `label`: The text displayed for the menu option.
 *   - `icon`: A JSX element displayed before the label.
 *   - `callback`: A function executed when the menu item is clicked.
 * @param {Object} [props.anchorOrigin] - Optional positioning for the `Menu` anchor.
 *   Defaults to `{ vertical: 'top', horizontal: 'right' }`.
 * @param {Object} [props.transformOrigin] - Optional positioning for how the menu transforms.
 *   Defaults to `{ vertical: 'top', horizontal: 'right' }`.
 * 
 * @throws {Error} If `functionList` is `null`, logs an error to the console and renders nothing.
 * 
 * @returns {JSX.Element | void} Returns a 3-dot menu button with dropdown options.
 */
export default function ThreeDotMenu({sx, functionList, anchorOrigin, transformOrigin}) {
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
    <Box sx={{...sx,py:"0px"}}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{py:"0px"}}
      >
        <MoreVertIcon/>
      </Button>
      
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin || {
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={transformOrigin || {
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          "& .MuiPaper-elevation":{
            marginLeft:"40px",
            bgcolor:"#0A0B0B",
            border:"solid #BCBDBF 1px"
          },
          "& .MuiMenu-list":{
            padding:"0px"
          }
        }}
      >
        {functionList.map(
            item=>(
            <MenuItem sx={{
                display:"flex", 
                flexDirection:"row", 
                alignItems:"center",
                gap:"1rem",
                cursor:"pointer",
                borderBottom:"solid #2C2D2D 1px",
                "&:hover":{backgroundColor:"#1A1B1B"}
                }} onClick={item.callback}>
              {(item.icon)}
              {item.label}
            </MenuItem>)
        )}
      </Menu>
    </Box>
  );
}