import {Box, Button, Typography, Link, CircularProgress} from '@mui/material'
import LeftArrow from '../../../components/icons/LeftArrow'
import { AUTH_TEXT } from '../../../constant/text/vi/auth';
import OtpInput from '../../../components/common/input/OtpInput'
import {isOtpFilled} from '../helper/isOtpFilled'
import useVerifyAccount from './useVerifyAccount';
import {style} from './verifyAccountStyle'
const text = AUTH_TEXT.verify_account

export default function VerifyAccount({onNavigate, email}){
  const {otp, onChange, submit, loading, resend, countdown} = useVerifyAccount(email, onNavigate)
  return(
    <Box sx={style.container}>
      {/* Back Arrow */}
      <LeftArrow onClick={() => onNavigate('register')} sx={style.arrow}/>

      {/* Title */}
      <Typography variant='title' sx={style.title}>{text.title}</Typography>

      {/* Description */}
      <Typography sx={{}}> {text.description} </Typography>

      {/* OTP Input */}
      <OtpInput otp={otp.otp} onChange={onChange} />

      {/* Submit Button */}
      <Button
        disabled={!isOtpFilled(otp.otp)}
        onClick={submit}
        variant="primary"
        sx={style.button}
      >
        {loading.submit ? null : text.submit}
      </Button>
      <Box sx={style.resend}>
        {countdown > 0
          ? <Typography>{text.resend_countdown(countdown)}</Typography>
          : (
              loading.resend
              ? <CircularProgress color='white' size={24}/>
              : <>
                  <Typography>{text.resend_ask}</Typography>
                  <Link  variant='secondary' onClick = {resend}>{text.resend_send}</Link>
                </>
            )
        }
      </Box>
    </Box>
  )
}