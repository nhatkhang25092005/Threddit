import { useState } from "react";
import { useNavigate, replace } from "react-router-dom";
import { validLogin } from "../../../utils/validation";
import { handleLoginRequest } from "../../../services/request/authRequest";
import { Result } from "../../../class";
import { handleGetUserInfoRequest} from "../../../services/request/userRequest"
import { DISPLAY, TITLE, ROUTES } from "../../../constant";

export default function useLogin() {
  //hooks
  const navigate = useNavigate()
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function executeLogin(){
    // Store username in localStorage
    const response = await handleGetUserInfoRequest()
    if(response.isOk()) localStorage.setItem("username", response.data.data.username)
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
      setResult(res.isOk() ? executeLogin() : new Result(DISPLAY.POPUP,TITLE.LOGIN_FAIL,res.message) )
      setLoading(false)
      return
    }
  }

  //actors
  return { login, result, loading };
}
