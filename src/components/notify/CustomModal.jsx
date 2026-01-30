import {Modal, Backdrop, Fade} from '@mui/material'
import { cloneElement, isValidElement } from 'react'
export default function CustomModal({open, onClose, children, container}){

  const childrenWithProps = isValidElement(children)
  ? cloneElement(children, { onClose })
  : children
  
  return(
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      container={container}
      sx={{zIndex:1600}}
    >
      <Fade in={open}>
        <div>
          {childrenWithProps}
        </div>
      </Fade>
    </Modal>
  )
}