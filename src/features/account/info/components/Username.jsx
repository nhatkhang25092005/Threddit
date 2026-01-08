import { useState } from "react"
import {Typography, TextField, CircularProgress, Box} from '@mui/material'
import { Edit, Ok } from "../../../../components/common/button"
import useUpdateName from '../hooks/useUpdateName'
import { useInput } from "../../../../hooks/useInput"


const style = {
  editing:{
    width:'fit-content',
    fontSize:'14px'
  }
}
export default function Username({value, sx}){
  const {update, loading, username} = useUpdateName(value)
  const [open, setOpen] = useState(false)
  const [form, onChange] = useInput({username:value})

  const handleKeyDown = async  (e) => {
    if(e.key === 'Escape') setOpen(false)
    if(e.key === 'Enter') {
      await update(e.target.value)
      setOpen(false)
    }
    if(e.key === " ") {e.preventDefault()}
  }
  
  const handleExecute = async () =>{
    await update(form.username)
    setOpen(false)
  }


  return(
    <>
      <Typography sx={sx}>Tên đăng nhập</Typography>
      {
        open
          ? <TextField
              name="username"
              defaultValue={value}
              autoFocus
              disabled = {loading}
              onBlur={()=>setOpen(false)}
              onKeyDown={(e)=>handleKeyDown(e)}
              onChange={onChange}
              sx={style.editing}
              variant='standard'/>
          : <Typography sx={sx}>{username}</Typography>
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
    </>
  )
}