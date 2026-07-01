import { useRef } from "react"
import {Box} from '@mui/material'
export default function ImageInput({'data-testid':testid, children, onClick, sx, multiple = false}){
  const ref = useRef(null)
  const handleInputFile = () => ref.current?.click()
  return(
    <Box sx={{display:'block',...sx}}>
      <input
        data-testid = {testid}
        type="file"
        style={{display:'none'}}
        ref = {ref}
        accept="image/*"
        multiple={multiple}
        onChange={onClick}
      />
      <Box onClick = {handleInputFile} >
        {children}
      </Box>
    </Box>
  )
}
