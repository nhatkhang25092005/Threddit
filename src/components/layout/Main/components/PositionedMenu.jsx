import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Icon from './Icon'

/**
 * PositionedMenu
 *
 * Icon-triggered contextual menu built with MUI.
 * Designed for contextual / overflow actions.
 *
 * Styling is handled via theme-level `MuiMenu` variants.
 *
 * @component
 *
 * @param {Object} props
 *
 * @param {Object} [props.sx]
 * Inline style object applied to the wrapper container.
 * Useful for positioning (absolute, margin, etc).
 *
 * @param {Array<{ label: string, func: Function }>} props.tasks
 * List of menu actions.
 * - label: text displayed in MenuItem
 * - func: callback executed when MenuItem is clicked
 *
 * @param {Function} [props.onClose]
 * Optional callback invoked when the menu is closed
 * (e.g. click outside, ESC key, or manual close).
 * Useful for syncing external UI state (sidebar collapse, etc).
 *
 * @example
 * const tasks = [
 *   { label: 'Edit', func: () => console.log('edit') },
 *   { label: 'Delete', func: () => console.log('delete') },
 * ]
 *
 * <PositionedMenu
 *   sx={{ position: 'absolute', top: 8, right: 8 }}
 *   tasks={tasks}
 *   onClose={() => setExpand(false)}
 * />
 *
 * @notes
 * - Menu uses `variant="default"` to match custom `MuiMenu` variants.
 * - Menu is rendered via MUI Popover (Portal).
 * - Clicking outside the menu triggers `onClose`.
 * - MenuItem click handlers do NOT auto-close the menu
 *   unless handled inside `func` or via `onClose`.
 */
export default function PositionedMenu({sx, tasks, onClose, icon = null}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
    onClose?.()
  };

  return (
    <div style={{...sx}}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon Icon={icon}/>
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
        variant='default'
      >
        {tasks.map(task=>
          <MenuItem onClick={()=>{
            task.func()
            handleClose()
            }}>
            {task.label}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}