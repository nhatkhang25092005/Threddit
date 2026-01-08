import { useNavigate } from 'react-router-dom';
import {services} from '../account.service'
import { useNotify } from '../../../hooks/useNotify';
import { modal } from '../../../constant/text/vi/modal';
export function useLogout(){
  const notify = useNotify()
  const navigate = useNavigate()
  const logout = async (path) => {
    notify.loading(true)
    const res = await services.logout()
    if(res.success){navigate(path,{replace:true})}
    else notify.popup(modal.title.error, res.message)
    notify.loading(false)
  }
  return {logout}
}