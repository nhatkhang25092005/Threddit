import { useState } from "react";
import {useInput} from "../../../hooks/useInput"
import { useNotify } from "../../../hooks/useNotify";
import { verifyService } from "./verify.service";
import { modal } from "../../../constant/text/vi/modal";
export default function useVerify(onNavigate,email){
  const [form, onChange] = useInput({
    email,
    otp:'',
    newPassword:'',
    confirmPassword:''
  })
  const [helperText, setHelperText] = useState(null)
  const [loading, setLoading] = useState()
  const notify = useNotify()
  const submit = async () => {
    setHelperText(null)
    const response = await notify.withLoading(
      ()=>verifyService(form),
      setLoading
    )
    if(!response.success){
      if(response.invalids){
        setHelperText(response.invalids)
        return
      }
      notify.popup(modal.title.error, response.message)
    }
    else{
      notify.popup(
        modal.title.success.verify,
        response.message,
        modal.button.back_to_login,
        ()=>onNavigate('login')
      )
    }
  }
  return {form, onChange, submit, helperText, loading}
}