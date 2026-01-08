import Surface from '../../../components/common/Surface'
import {TextField, Typography, Button} from '@mui/material'
import { style } from './style'
import {account} from '../../../constant/text/vi/account.text'
import { useUpdatePassword } from './useUpdatePassword'
import {isFormFilled} from '../../../utils/isFormFilled'
const text = account.update_password
const fields = ['old','new','confirm']

export default function UpdatePassword(){
  const {form, onChange, loading, submit, helperText} = useUpdatePassword()
  return(
    <Surface sx={style.container}>
      <Typography sx={style.title}>{text.title}</Typography>
      {fields.map((field)=>(
        <TextField
          key={field}
          name={text.name[field]}
          label={text.label[field]}
          onChange={onChange}
          value={form[field]}
          type='password'
          variant='standard'
          helperText = {helperText?.[field]}
          error = {helperText?.[field]}
        />
      ))}
      <Button
        loading = {loading}
        variant = 'primary'
        sx = {style.button}
        onClick = {submit}
        disabled = {!isFormFilled(form)}
      >
        {loading ? '\u00A0' : text.button}
      </Button>
    </Surface>
  )
}