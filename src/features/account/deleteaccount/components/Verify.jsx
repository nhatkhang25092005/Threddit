import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
  Button
} from '@mui/material'

import OtpInput from '../../../../components/common/input/OtpInput'
import { account } from "../../../../constant/text/vi/account.text"
import { useVerify } from '../hooks/useVerify'
import {isOtpFilled} from '../../../../utils/isOtpFilled'

import { style } from '../style'
const sx = style.verify
const text = account.delete_verify
export default function Verify({onClose}){
  const {otp, onChange, submit, loading} = useVerify(onClose)
  return(
    <Box>
      <DialogTitle>{text.title}</DialogTitle>
      <DialogContent>
        <Box sx={sx.otp_container}>
          <OtpInput onChange={onChange} otp={otp}/>
        </Box>
        <DialogContentText>{text.message}</DialogContentText>
      </DialogContent>
      
      <DialogActions>
        <Button
          loading={loading}
          variant='dialog'
          sx={{color:'#fd4848ff', fontWeight:'bold'}}
          onClick={submit}
          disabled={!isOtpFilled(otp)}
        >
          {text.button}
        </Button>
      </DialogActions>
    </Box>
  )
}


  