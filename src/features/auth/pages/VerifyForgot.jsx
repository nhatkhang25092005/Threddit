import Column from "../../../components/layout/Column";

import {Button, Typography} from "@mui/material"

import { TITLE, TEXT, LABEL, DISPLAY} from "../../../constant";

import LoadingScreen from "../../../components/common/LoadingScreen";
import PopupNotification from "../../../components/common/PopupNotification";

import InputField  from "../../../components/common/InputField";
import SmallForm from "../../../components/layout/SmallForm";
import useVerifyForgot from "../hooks/useVerifyForgot";
import { useState, useEffect } from "react";
export default function VerifyForgot() {
  const {verifyReset, result, loading} = useVerifyForgot()

  //handle on form
  const [form, setForm] = useState({code:"", newPassword:"", confirmPassword:""})
  function handleChange(e){
    const {name, value} = e.target
    setForm((prev)=>({
      ...prev,
      [name] : value
    }))
  }

  //handle on modal
  const [open, setOpen] = useState(false)
  useEffect(()=>{if(result?.type === DISPLAY.POPUP) setOpen(true)},[result])

  return (
    <>  
      <PopupNotification 
        open={open} 
        onClose={()=>{result?.fallback ? result.fallback() : setOpen(false)}} 
        title={result?.title}
        content={result?.message}  
      />
      <LoadingScreen control={loading}/>
      <Column customStyle={{pt:"5rem"}}>
          <Typography variant="title">{TITLE.RESET_PASSWORD_VERIFY}</Typography>
          <Typography sx={{mb:5}}>{TEXT.RESET_PASSWORD_VERIFY}</Typography>
          <SmallForm>
              <InputField setError={result?.code} helperText={result?.code} setName={"code"} setValue={form.code} setOnChange={(e)=>handleChange(e)} label={LABEL.CODE} type={"text"} isRequired/>
              <InputField setError={result?.newPassword} helperText={result?.newPassword} setName={"newPassword"} setValue={form.newPassword} label={LABEL.NEW_PASSWORD} setOnChange={(e)=>handleChange(e)} type={"password"} isRequired/>
              <InputField setError={result?.confirmPassword} helperText={result?.confirmPassword} setName={"confirmPassword"} setValue={form.confirmPassword} label={LABEL.CONFIRM_PASS} setOnChange={(e)=>handleChange(e)} type={"password"} isRequired/>   
              <Button variant="contained" onClick={()=>verifyReset(form)}>{TITLE.RESET_PASSWORD}</Button>
          </SmallForm>
      </Column>
    </>
  );
}
