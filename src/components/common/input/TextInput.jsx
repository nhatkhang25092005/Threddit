import {Box} from '@mui/material'
import { useState } from 'react'
import { useInput } from '../../../hooks/useInput'
const style = {
  editing:{
    width:'fit-content',
    fontSize:'14px'
  }
}
export default function TextInput({name, value, sx, onConfirm, loading}){
  const [open, setOpen] = useState(false)
  const [form, onChange] = useInput({[name]:value})
  const handleExecute = async () => {
    await onConfirm()
    setOpen(false)
  }

  const handleKeyDown = async  (e) => {
    if(e.key === 'Escape') setOpen(false)
    if(e.key === 'Enter') {
      await onConfirm(e.target.value)
      setOpen(false)
    }
    if(e.key === " ") {e.preventDefault()}
  }
  return(
    <Box>
      {
        open
          ? <TextField
              name={name}
              defaultValue={value}
              autoFocus
              disabled = {loading}
              onBlur={()=>setOpen(false)}
              onKeyDown={(e)=>handleKeyDown(e)}
              onChange={onChange}
              sx={style.editing}
              variant='standard'/>
          : <Typography sx={sx}>{form[name]}</Typography>
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