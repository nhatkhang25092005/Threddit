import { useNavigate } from "react-router-dom"
import { routes } from "../../../../constant"
import { sidebar } from "../../../../constant/text/vi/sidebar.text"
import { useLogout } from "../../../../features/account/logout/useLogout"

export function useMenu() {
  const navigate = useNavigate()
  const {logout} = useLogout()
  
  const goTo = (path) => {
    navigate(path, {replace: true})
  }

  const items = {
  account: {
    label: sidebar.menu.accountInfo,
    callback: () => goTo(routes.account),
  },
  change_password: {
    label: sidebar.menu.changePassword,
    callback: () => goTo(routes.update_password),
  },
  log_out:{
    label: sidebar.menu.logout,
    callback: () => logout(routes.auth),
  }
}

  return Object.values(items).map((item) => ({
    label: item.label,
    func: item.callback,
  }))
}
