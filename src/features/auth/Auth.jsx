import Login from "./login/Login";
import ThemeToggleBtn from "../../components/common/button/ThemeToggleBtn";
import {Box} from '@mui/material'
import Symbol from "./components/Symbol";
import { useState } from "react";
import Surface from "../../components/common/Surface"
import Register from "./register/Register";
import Forgot from "./forgot/Forgot";
import Verify from "./verify/Verify";
import VerifyAccount from "./register/VerifyAccount";

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
    <Box sx={{display:'flex', flexDirection:'row'}}>
      <ThemeToggleBtn sx={{position:'absolute'}}/>

      {/* Symbol zone */}
      <Box sx={{display:'block', width:'65vw'}}>
        <Symbol/>
      </Box>

      {/* Effect apply */}
      {/* <Surface variant="auth" >
        <AuthSwitch active={active}>
          <Login name={'login'} onNavigate={setActive}/>
          <Test name={'forgot'}/>
        </AuthSwitch>
      </Surface> */}

      <Surface variant='auth'>
        {form[active.target]}
      </Surface>
    </Box>
  )
}