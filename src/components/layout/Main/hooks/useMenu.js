import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../../../constant"
import { sidebar } from "../../../../constant/text/vi/sidebar.text"
import { useLogout } from "../../../../features/account/logout/useLogout"

export function useMenu() {
  const navigate = useNavigate()
  const { logout } = useLogout()

  return useMemo(() => ([
    {
      label: sidebar.menu.accountInfo,
      func: () => navigate(routes.account, { replace: true }),
    },
    {
      label: sidebar.menu.changePassword,
      func: () => navigate(routes.update_password, { replace: true }),
    },
    {
      label: sidebar.menu.logout,
      func: () => logout(routes.auth),
    },
  ]), [logout, navigate])
}
