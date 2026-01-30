import { useState } from "react";
import { useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { modal } from "../../../constant/text/vi/modal";
import { useNotify } from "../../../hooks/useNotify";
import { loginService } from "./login.service";
import { useInput } from "../../../hooks/useInput";
import {routes} from '../../../constant'
import { isFormFilled } from "../helper/isFormFilled";

export default function useLogin() {
  //hooks
  const navigate = useNavigate()
  const [helperText, setHelperText] = useState(null);
  const notify = useNotify()
  const [form, onChange] = useInput({email:"", password:""})
  const {setUser} = useAuth()

  //execute
  const submit = async () => {
    setHelperText(null)
    if(!isFormFilled(form)) return
    const res = await notify.withLoading(() => loginService(form))
    if(!res.success){
      if(res.invalids){
        setHelperText(res.invalids)
        return
      }
      notify.popup(modal.title.error,res.message)
    }
    else{
      setUser(res.data.username)
      navigate(routes.account,{replace:true})
    }
  }

  //actors
  return { submit,form, helperText, onChange };
}
