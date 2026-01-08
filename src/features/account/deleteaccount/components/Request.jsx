import { account } from "../../../../constant/text/vi/account.text"
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
  Button
} from '@mui/material'
import useRequest from "../hooks/useRequest"
const text = account.delete_request
export default function Request({onTab}){
  const {request, loading} = useRequest(onTab)
  return(
    <Box>
      <DialogTitle>{text.title}</DialogTitle>

      <DialogContent>
        <DialogContentText id='message'>
          {text.message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant='dialog'
          loading={loading}
          sx={{color:'#fd4848ff', fontWeight:'bold'}}
          onClick ={request}
        >
          {text.button}
        </Button>
      </DialogActions>
    </Box>
  )
}