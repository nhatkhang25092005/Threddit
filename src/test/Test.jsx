import Surface from "../components/common/Surface";
import {Typography, TextField, Box, Button, Tab, Tabs} from '@mui/material'
import ThemeToggleBtn from '@/components/common/button/ThemeToggleBtn'
import { useInput } from "../hooks/useInput";
import { useEffect, useRef, useState } from "react";
import RowRadioInput from '../components/common/input/RowRadioInput'
import MoreInfoMenu from '../components/layout/Main/components/PositionedMenu'
import Ok from '../components/common/button/Ok'
import Notification from "../features/notification/components/Notification";
import TabsController from "../components/layout/TabsController";
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

  // useEffect(()=>{notify.popup('hello','test')},[notify])


  const loginSimulate = (form) => {
    if(form.email === 'false'){
      setErr(true)
    }
    else setErr(false)
  }

  const [updateDate, setUpdateDate] = useState(0)
  const handleClick = () => {
    setUpdateDate(prev=>prev+1)
  }
  const data  = useRef(updateDate)
  useEffect(()=>{
    console.log(data.current)
    console.log(updateDate)},[updateDate])
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
            onClick={()=>loginSimulate(form)}>Login
          </Button>

          <Button onClick={handleClick}>
            Modal Custom Demo Open
          </Button>
        </Box>
        <MoreInfoMenu tasks={tasks}/>
      </Surface>
      <Ok type={1}/>
      <Typography>{data.current}</Typography>
      <Surface>
      </Surface>
    </div>
  )
}