import { useRef } from "react"
import {Box} from '@mui/material'

export default function SoundInput({children, onClick, sx}){
  const ref = useRef(null)
  const handleInputFile = () => ref.current?.click()

  return(
    <Box sx={{display:'block',...sx}}>
      <input
        type="file"
        style={{display:'none'}}
        ref = {ref}
        accept="audio/*"
        onChange={onClick}
      />
      <Box onClick = {handleInputFile} >
        {children}
      </Box>
    </Box>
  )
}
