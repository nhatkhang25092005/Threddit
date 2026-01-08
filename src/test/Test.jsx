import Surface from "../components/common/Surface";
import {Typography, TextField, Box, Button} from '@mui/material'
import ThemeToggleBtn from '@/components/common/button/ThemeToggleBtn'
import { useInput } from "../hooks/useInput";
import { useEffect, useState } from "react";
import RowRadioInput from '../components/common/input/RowRadioInput'
import MoreInfoMenu from '../components/layout/Main/components/PositionedMenu'
import Ok from '../components/common/button/Ok'
const fields = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

const tasks = [
  {
    label:'alert hello',
    func: () => {
      alert('hello')
    }
  },
  {
    label:'alert Zesk',
    func: () => {
      alert('Zesk')
    }
  }
]

export default function Test(){
  const [form, handleChange] = useInput({email:'',gender:''})
  const [err, setErr] = useState(false)

  useEffect(()=>console.log(form),[form])

  const loginSimulate = (form) => {
    if(form.email === 'false'){
      setErr(true)
    }
    else setErr(false)
  }
  return (
    <div style={{height:'100vh', display:'flex'}}>
      <Surface variant="auth">
        <Box sx={{display:'flex', flexDirection:'column'}}>
          <ThemeToggleBtn/>
          <Typography variant="normal">Normal text</Typography>
          <Typography variant="title">Login</Typography>
          <TextField variant='standard' name="email" onChange={handleChange} value={form.email} label="email" helperText={err ? 'error' : null} error = {err}/>
          <RowRadioInput value={form.gender} name={'test'} fields={fields} onChange={handleChange} />
          <Button
            variant="primary"
            onClick={()=>loginSimulate(form)}>Login</Button>
        </Box>
        <MoreInfoMenu tasks={tasks}/>
      </Surface>
      <Ok type={1}/>
      <Surface>
        <Typography>
          Hello
        </Typography>
      </Surface>
    </div>
  )
}