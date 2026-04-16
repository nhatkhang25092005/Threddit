import Login from "./login/Login";
import {Box} from '@mui/material'
import Symbol from "./components/Symbol";
import { useState } from "react";
import Surface from "../../components/common/Surface"
import Register from "./register/Register";
import Forgot from "./forgot/Forgot";
import Verify from "./verify/Verify";
import VerifyAccount from "./register/VerifyAccount";
import { authLayout } from "./style/layout";

export default function Auth(){
  const [active, setActive] = useState({target:'login', payload:null})

  const onNavigate = (target, payload = null) => { setActive({target, payload}) }

  const form = {
    login:<Login onNavigate={onNavigate}/>,
    register:<Register onNavigate={onNavigate}/>,
    verify_account:<VerifyAccount onNavigate={onNavigate} email={active.payload}/>,
    forgot:<Forgot onNavigate={onNavigate}/>,
    verify:<Verify onNavigate={onNavigate} email = {active.payload}/>,
  }

  return(
    <Box sx={authLayout.page}>
      <Box sx={authLayout.symbol}>
        <Symbol/>
      </Box>

      <Surface variant='auth'>
        {form[active.target]}
      </Surface>
    </Box>
  )
}
