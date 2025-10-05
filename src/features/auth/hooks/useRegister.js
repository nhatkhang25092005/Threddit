import { useState } from "react";
import { handleRegisterRequest } from "../../../services/request/authRequest";
import { Result } from "../../../class";
import { validRegister } from "../../../utils/validation";
import { replace, useNavigate } from "react-router-dom";
import {ROUTES,ERRORS} from "../../../constant/"

export default function useRegister() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handleError(errorFields){
    setResult(errorFields)
  }
  const register = async (formData) => {
    const validResult =  validRegister(formData)
    console.log(validResult)
    // valid each field
    if (typeof validResult === "object" && validResult !== null) {
        handleError(validResult)
        console.log(result)
        return
    }
    
    //all corrected
    else{
      setLoading(true);
      const response = await handleRegisterRequest(formData.email, formData.displayName, formData.password, formData.confirmPassword);
      setResult(response.isOk() ? navigate(ROUTES.VERIFY, {state:{email : formData.email}, replace}) : new Result(response.displayType,ERRORS.REGISTER,response.message));
      setLoading(false);
      return
    }
  };

  return { register, loading, result };
}
