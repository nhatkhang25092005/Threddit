import { useRef } from "react"
import {Box} from '@mui/material'

export default function VideoInput({'data-testid':testId = null, children, onClick, sx, multiple = false}){
  const ref = useRef(null)
  const handleInputFile = () => ref.current?.click()

  return(
    <Box sx={{display:'block',...sx}}>
      <input
        data-testid = {testId}
        type="file"
        style={{display:'none'}}
        ref = {ref}
        accept="video/*"
        multiple={multiple}
        onChange={onClick}
      />
      <Box onClick = {handleInputFile} >
        {children}
      </Box>
    </Box>
  )
}
