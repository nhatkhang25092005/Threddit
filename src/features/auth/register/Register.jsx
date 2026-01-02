import {Box, Button, TextField, Typography, Divider, Link} from '@mui/material'
import { AUTH_TEXT } from '../../../constant/text/vi/auth'
import { registerStyles } from './registerStyles'
import DateInput from '../../../components/common/input/DateInput'
import RowRadioInput from '../../../components/common/input/RowRadioInput'
import GoogleAuthorize from '../../../components/google/GoogleAuthorize'

import useRegister from './useRegister'
import { isFormFilled } from '../helper/isFormFilled'

const text = AUTH_TEXT.register
const textFieldInputs = ['username', 'display_name','email','password','repass']

export default function Register({ onNavigate }) {
  const{validate, form, onChange, handleSubmit} = useRegister(onNavigate)

  return (
    <Box sx={registerStyles.container}>
      {/* Title */}
      <Typography variant="title" sx={registerStyles.title}>
        {text.title}
      </Typography>

      <Box>
        {/* Fields */}
        {textFieldInputs.map(field=>(
          <TextField
            key={field}
            sx={registerStyles.textfield}
            variant='standard'
            type={field === 'password' || field === 'repass' ? 'password' : null}
            name={text.name[field]}
            value={form[text.name[field]]}
            label={text.label[field]}
            helperText = {validate?.[field]}
            error = {validate?.[field]}
            onChange={onChange}
          />
        ))}

        {/* Gender and Date of birth */}
        <Box sx={registerStyles.gender_and_birth}>
          {/* gender */}
          <RowRadioInput
            sx={registerStyles.radio}
            label={text.label.gender}
            name={text.name.gender}
            value={form[text.name.gender]}
            onChange={onChange}
            fields={[
              { value: "male", label:text.label.male },
              { value: "female", label: text.label.female },
              { value: "other", label: text.label.other },
            ]}
          />

          {/* date of birth */}
          <DateInput
            sx={registerStyles.birth}
            label={text.label.date_of_birth}
            name={text.name.date_of_birth}
            value={form[text.name.date_of_birth]}
            onChange={onChange}
          />
        </Box>
      </Box>

      <Button
        variant="primary"
        sx={registerStyles.button}
        onClick={handleSubmit}
        disabled = {!isFormFilled(form)}
      >
        {text.submit}
      </Button>

      <Divider variant="thick" sx={{ mt: "auto" }} />

      <GoogleAuthorize />

      <Box sx={registerStyles.login}>
        <Typography>{text.login_ask}</Typography>
        <Link variant="secondary" onClick={() => onNavigate("login")}>
          {text.login_path}
        </Link>
      </Box>
    </Box>
  )
}
