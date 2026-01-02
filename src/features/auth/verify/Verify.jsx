import {Box, Button, Typography, TextField} from '@mui/material'
import LeftArrow from '../../../components/icons/LeftArrow'
import { AUTH_TEXT } from '../../../constant/text/vi/auth';
import OtpInput from '../../../components/common/input/OtpInput'
import {isOtpFilled} from '../helper/isOtpFilled'
import useVerify from './useVerify';
import {style} from './verifyStyle'

const text = AUTH_TEXT.verify

const fields = ['new_pass','confirm']

export default function Verify({onNavigate, email}){
  const {form, onChange, submit, loading, helperText} = useVerify(onNavigate, email)

  return(
    <Box sx={style.container}>
      {/* Back Arrow */}
      <LeftArrow onClick={() => onNavigate('login')} sx={style.arrow}/>

      {/* Title */}
      <Typography variant='title' sx={style.title}>{text.title}</Typography>

      {/* Description */}
      <Typography> {text.description} </Typography>

      {/* OTP Input */}
      <OtpInput otp={form.otp} onChange={onChange} />


      {
        fields.map(field=>
          <TextField
            variant='standard'
            label = {text.label[field]}
            name = {text.name[field]}
            onChange={onChange}
            value={form[text.name[field]]}
            error = {helperText?.[field]}
            helperText ={helperText?.[field]}
          />
        )
      }

      {/* Submit Button */}
      <Button
        disabled={!isOtpFilled(form.otp)}
        onClick={submit}
        variant="primary"
        sx={style.button}
      >
        {loading ? '\u00A0'  : text.submit}
      </Button>
    </Box>
  )
}