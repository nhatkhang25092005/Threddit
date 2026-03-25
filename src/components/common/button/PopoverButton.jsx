import { Box, Popover, Typography} from '@mui/material'
import { useEffect, useState } from 'react';
export default function PopoverButton({
  closeReason,
  Icon,
  disable,
  label,
  onClose,
  children,
  surfaceVariant,
  surfaceSx,
  buttonSx,
  labelSx
}){
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event) => {
    if(disable) return
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    onClose?.()
  }

  useEffect(()=>{
    if(closeReason === true && open){
      handleClose()
      onClose?.()
    }
  },[closeReason, open, onClose])
  
  return(
    <>
      <Box
        id={`popover`}
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            gap: label ? '0.45rem' : 0,
          },
          buttonSx,
          {
            cursor: disable ? 'default' : 'pointer',
          }
        ]}
        onClick={handleClick}
      >
        {Icon ? <Icon /> : undefined}
        {label ? <Typography sx={labelSx}>{label}</Typography> : null}
      </Box>
      <Popover
        id='popover'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper:{
            onClick: (e) => e.stopPropagation(),
            sx: {
              height: 'fit-content',
              maxHeight:'35rem',
              overflow: 'auto',
              width: 360,
                '&::-webkit-scrollbar': {
                  width: '8px',
                  height: '8px', // for horizontal scrollbar
                },
                // Scrollbar track
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                  borderRadius: '10px',
                },
                // Scrollbar thumb
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#555',
                  },
                },
                  ...surfaceSx
            },
            variant:surfaceVariant
          }
        }}
      >
        {children}
      </Popover>
    </>
  )
}
