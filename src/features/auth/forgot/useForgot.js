import { useState } from "react";
import {forgotService} from "./forgot.service"
import { modal } from "../../../constant/text/vi/modal";
import { useInput } from "../../../hooks/useInput";
import { useNotify } from "../../../hooks/useNotify";
export function useForgot(onNavigate){
  const [form, onChange] = useInput({email:''})
  const [loading, setLoading] = useState(false)
  const notify = useNotify()
  const [helperText, setHelperText] = useState(null)
  const onSubmit = async () => {
    setHelperText(null)
    const response = await notify.withLoading(
      ()=>forgotService(form.email),
      setLoading
    )
    if(!response.success){
      if(response.invalids){
        setHelperText(response.invalids.email)
        return
      }
      notify.popup(modal.title.error, response.message)
    }
    else{
      onNavigate('verify', form.email)
    }
  }

  return{
    onSubmit,
    form,
    loading,
    onChange,
    helperText
  }
}