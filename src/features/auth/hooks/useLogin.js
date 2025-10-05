import { useState } from "react";
import { useNavigate, replace } from "react-router-dom";
import { validLogin } from "../../../utils/validation";
import { handleLoginRequest } from "../../../services/request/authRequest";
import { Result } from "../../../class";
import { DISPLAY, TITLE, ROUTES } from "../../../constant";

export default function useLogin() {
  //hooks
  const navigate = useNavigate()
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function executeLogin(res){
    localStorage.setItem("accessToken",res.data.data.accessToken)
    navigate(ROUTES.PROFILE, replace)
  }

  //execute
  const login = async (formData) => {
    setResult(null)
    // validation
    const resultValid = validLogin(formData);

    //check validation result
    if(typeof resultValid === "object" && resultValid !== null){
      console.error("Error",resultValid)
      setResult(resultValid)
      return
    }

    //call api if all fields are filled
    else{
      setLoading(true)
      const res = await handleLoginRequest(formData.email, formData.password)
      setResult(res.isOk() ? executeLogin(res) : new Result(DISPLAY.POPUP,TITLE.LOGIN_FAIL,res.message) )
      setLoading(false)
      return
    }
  }

  //actors
  return { login, result, loading };
}
