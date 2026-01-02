import {Box, Typography} from "@mui/material"
import Logo from "../../../components/common/Logo"
const style = {
    width:'100%',
    height:'100vh',
    display:'flex',
    flexDirection:'column',
    justifyContents:'center',
    py:'auto',
    alignItems:'center',
}
export default function Symbol(){
  return(
    <Box sx={style}>
      <Logo/>
      <Typography sx={{fontWeight:'bold'}} variant="title">Welcome to Threddit</Typography>
    </Box>
  )
}