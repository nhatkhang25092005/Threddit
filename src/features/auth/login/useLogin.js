import { useState } from "react";
import { useNavigate, replace } from "react-router-dom";
import { validLogin } from "../../../utils/validation";
import { handleLoginRequest } from "../../../services/request/authRequest";
import { handleGetUserInfoRequest} from "../../../services/request/userRequest"
import { modal } from "../../../constant/text/vi/modal";
import { useNotify } from "../../../hooks/useNotify";
import { loginService } from "./login.service";
import { useInput } from "../../../hooks/useInput";


async function executeLogin(navigate){
    // Store username in localStorage
    const response = await handleGetUserInfoRequest()
    if(response.isOk()){
      localStorage.setItem("username", response.data.data.username)
    }
  }

export default function useLogin() {
  //hooks
  const navigate = useNavigate()
  const [helperText, setHelperText] = useState(null);
  const notify = useNotify()
  const [form, onChange] = useInput({email:"", password:""})

  //execute
  const submit = async () => {
    setHelperText(null)

    const res = await notify.withLoading(() => loginService(form))
    if(!res.success){
      if(res.invalids){
        setHelperText(res.invalids)
        return
      }
      notify.popup(modal.title.error,res.message)
    }
    else{
      alert("logged in!")
    }
  }

  //actors
  return { submit,form, helperText, onChange };
}
