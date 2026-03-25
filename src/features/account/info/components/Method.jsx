import {Typography} from '@mui/material'
import { account } from '../../../../constant/text/vi/account.text'
export default function Method({sx, value}){
  return(
    <>
      <Typography sx={sx}>{account.label.method}</Typography>
      <Typography >{value}</Typography>
    </>
  )
}
