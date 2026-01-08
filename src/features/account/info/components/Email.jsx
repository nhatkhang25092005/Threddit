import {Typography} from '@mui/material'
export default function Email({sx, value}){
  return(
    <>
      <Typography sx={sx}>Email:</Typography>
      <Typography>{value}</Typography>
    </>
  )
}