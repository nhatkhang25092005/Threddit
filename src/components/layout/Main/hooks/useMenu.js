import { useNavigate } from "react-router-dom"
import { routes } from "../../../../constant"
import { useLogout } from "../../../../features/account/logout/useLogout"

export function useMenu() {
  const navigate = useNavigate()
  const {logout} = useLogout()
  
  const goTo = (path) => {
    navigate(path, {replace: true})
  }

  const items = {
  account: {
    label: 'Thông tin tài khoản',
    callback: () => goTo(routes.account),
  },
  change_password: {
    label: 'Đổi mật khẩu',
    callback: () => goTo(routes.update_password),
  },
  log_out:{
    label: 'Đăng xuất',
    callback: () => logout(routes.auth),
  }
}

  return Object.values(items).map((item) => ({
    label: item.label,
    func: item.callback,
  }))
}