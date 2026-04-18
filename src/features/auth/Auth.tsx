import { useState } from "react";
import { Box } from "@mui/material";
import Surface from "../../components/common/Surface";
import Symbol from "./components/Symbol";
import Forgot from "./forgot/Forgot";
import Login from "./login/Login";
import Register from "./register/Register";
import VerifyAccount from "./register/VerifyAccount";
import { authLayout } from "./style/layout";
import Verify from "./verify/Verify";
import type { AuthNavigate, AuthState } from "./types/ui";

export default function Auth() {
  const [active, setActive] = useState<AuthState>({
    target: "login",
    payload: null,
  })

  const onNavigate: AuthNavigate = (target, payload = null) => {
    setActive({ target, payload })
  }

  const activeForm = (() => {
    switch (active.target) {
      case "login":
        return <Login onNavigate={onNavigate} />
      case "register":
        return <Register onNavigate={onNavigate} />
      case "verify_account":
        return (
          <VerifyAccount
            onNavigate={onNavigate}
            email={active.payload ?? ""}
          />
        )
      case "forgot":
        return <Forgot onNavigate={onNavigate} />
      case "verify":
        return <Verify onNavigate={onNavigate} email={active.payload ?? ""} />
      default:
        return <Login onNavigate={onNavigate} />
    }
  })()

  return (
    <Box sx={authLayout.page}>
      <Box sx={authLayout.symbol}>
        <Symbol />
      </Box>

      <Surface variant="auth">{activeForm}</Surface>
    </Box>
  )
}
