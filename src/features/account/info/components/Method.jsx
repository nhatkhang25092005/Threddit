import {Typography} from '@mui/material'
export default function Method({sx, value}){
  return(
    <>
      <Typography sx={sx}>Phương thức đăng nhập:</Typography>
      <Typography >{value}</Typography>
    </>
  )
}