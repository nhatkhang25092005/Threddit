import { Typography, Button, Box, TextField, Link, Divider } from "@mui/material";
import useLogin from "./useLogin";
import GoogleAuthorize from "../../../components/google/GoogleAuthorize";
import { AUTH_TEXT } from "../../../constant/text/vi/auth";
import { loginStyles } from "./loginStyles";
import {isFormFilled} from '../helper/isFormFilled'

export default function Login({onNavigate}) {
  // const {login, result} = useLogin()
  const {submit, helperText, onChange, form} = useLogin()
  return (
    <Box sx={loginStyles.container}>
      {/* Title */}
      <Typography variant="title" sx={loginStyles.title}>{AUTH_TEXT.login.title}</Typography>
      
      {/* fields  */}
      <Box sx={loginStyles.fields}>
        <TextField
          onChange={onChange}
          variant='standard'
          name="email"
          helperText = {helperText?.['email']}
          error = {helperText?.['email']}
          value={form.email}
          label={AUTH_TEXT.login.email_field}
        />
        <TextField
          onChange={onChange}
          variant='standard'
          type="password"
          name="password"
          helperText = {helperText?.['password']}
          error = {helperText?.['password']}
          value={form.password}
          label={AUTH_TEXT.login.password_field}
        />
      </Box>
      
      {/* Submit, forgot password */}
      <Box sx={loginStyles.button}>
        <Link variant="primary" onClick={()=>onNavigate('forgot')}>{AUTH_TEXT.login.forgot_password}</Link>
        <Button disabled={!isFormFilled(form)} onClick={submit} variant="primary" sx={{width:'100%'}}>{AUTH_TEXT.login.submit}</Button>
      </Box>
      
      <Divider
        variant="thick"
        sx={{mt:'4rem'}}
      />
      
      <GoogleAuthorize/>
      
      {/* Register */}
      <Box sx={loginStyles.register}>
        <Typography>{AUTH_TEXT.login.register_ask}</Typography>
        <Link
          variant="secondary"
          onClick = {()=>onNavigate('register')}
        >{AUTH_TEXT.login.register_path}</Link>
      </Box>
    </Box>
  );
}
