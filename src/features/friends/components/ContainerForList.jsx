import {Box, Typography, CircularProgress} from '@mui/material'
import { style } from '../style'
export default function ContainerForList({
  loading,
  text,
  children
}){
  return(
    <Box sx={style.container_for_list.box}>
      {loading
        ? <CircularProgress sx={style.container_for_list.text} size={20} color='white'/>
        : <Typography sx={style.container_for_list.text}>{text}</Typography>}
      {children}
    </Box>
  )
}