import {Box, Typography, TextField, CircularProgress} from '@mui/material'
import { useState } from 'react'
import { Edit, Ok } from "../../../components/common/button"
import { useInput } from '../../../hooks/useInput'
import { useProfileContext } from '../hooks'
const style = {
  editing:{
    width:'fit-content',
    fontSize:'14px'
  }
}
export default function Displayname(){
  const {state, actions} = useProfileContext()
  const [open, setOpen] = useState(false)
  const [form, onChange] = useInput({displayName:state.displayName})


  const loading = state.loading.update_displayname
  const handleExecute = async () => {
    await actions.info.editDisplayname(form, state.displayName)
    setOpen(false)
  }

  const handleKeyDown = async  (e) => {
    if(e.key === 'Escape') setOpen(false)
    if(e.key === 'Enter') {
      await actions.info.editDisplayname({displayName:e.target.value}, state.displayName)
      setOpen(false)
    }
    if(e.key === " ") {e.preventDefault()}
  }
  return(
    <Box sx={{display:'flex', gap:1}}>
      {
        open
          ? <TextField
              name='displayName'
              defaultValue={state.displayName}
              autoFocus
              disabled = {loading}
              onBlur={()=>setOpen(false)}
              onKeyDown={(e)=>handleKeyDown(e)}
              onChange={onChange}
              sx={style.editing}
              variant='standard'/>
          : <Typography variant='title'>{state.displayName}</Typography>
      }
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width:'fit-content' }}>
          <CircularProgress size={20} sx={{ color: 'white' }} />
        </Box>
      ) : (
        open
          ? <Ok onClick={handleExecute} />
          : <Edit onClick={() => setOpen(!open)} />
      )}
    </Box>
  )
}