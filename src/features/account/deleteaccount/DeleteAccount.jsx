import {Dialog, Slide, Box, Fade} from '@mui/material'

import Request from './components/Request'
import Verify from './components/Verify';

import { forwardRef, useState } from 'react';

import {style} from './style'

const sx = style.hub

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteAccount({open, onClose}){
  const [tab, setTab] = useState('request')

  const close = () => {
    onClose()
    setTimeout(()=>setTab('request'),300)
  }

  const contents = {
    request:<Request onTab={setTab} onClose={close}/>,
    verify:<Verify onClose={close}/>,
  }
  
  return(
    <Dialog
      open={open}
      onClose={close}
      slots={{transition: Transition}}
      fullWidth
    >
      <Box sx={sx.container}>
        {Object.keys(contents).map(key=>(
          <Fade key={key} in={tab===key} timeout={0} unmountOnExit>
            {key === 'verify'
              ? <Slide key={key} direction='left' in = {tab===key} timeout={300} unmountOnExit>
                  <Box sx={sx.slide_container(tab===key)}>{contents[key]}</Box>
                </Slide>
              : <Box sx={sx.slide_container(tab===key)}>{contents[key]}</Box>
            }
          </Fade>
        ))}
      </Box>
    </Dialog>
  )
}