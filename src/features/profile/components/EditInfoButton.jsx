import {Button, Box} from '@mui/material'
import { profile } from '../../../constant/text/vi/profile.text'
import { style } from '../style'
export default function EditInfoButton(){
  return(
    <Box sx={{display:'flex'}}>
      <Button variant='secondary' sx={style.header.info_container.edit_button}>
        {profile.button.edit_info}
      </Button>
    </Box>
  )
}