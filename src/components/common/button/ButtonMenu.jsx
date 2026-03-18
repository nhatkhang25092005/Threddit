import {useState}  from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ButtonMenu({label, actions, buttonSx, buttonVariant, buttonDisabled = false}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (buttonDisabled) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant={buttonVariant || 'primary'}
        sx={buttonSx}
        disabled={buttonDisabled}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        variant='default'
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 400,
        }}
        slotProps={{
          paper: {
            sx: {
              mt: '0.35rem',
              minWidth: '10rem',
            },
          },
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} disabled={Boolean(action?.disabled)} onClick={ () => {
            if (action?.disabled) return
            handleClose()
            action?.callback()
          }}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
