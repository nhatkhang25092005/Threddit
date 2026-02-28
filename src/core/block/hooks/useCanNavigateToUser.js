import { useGetBlockStatus } from "./useGetBlockStatus";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNotify } from "../../../hooks/useNotify";
import { modal } from "../../../constant/text/vi/modal";
import useAuth from '../../auth/useAuth'

export function useCanNavigateToUser(){
  const getBlockStatus = useGetBlockStatus()
  const navigate = useNavigate()
  const notify = useNotify()
  const {isOwnerByUsername} = useAuth()
  const canNavigateToUser = useCallback(async (baseUrl, username) => {
    if(isOwnerByUsername(username)) return navigate(`${baseUrl}/${username}`)
    const isBlocked = await getBlockStatus(username)
    if(isBlocked){
      notify.popup(modal.title.notification, 'Bạn đã chặn người dùng này. Vui lòng gỡ chặn để truy cập')
      return
    }
    else navigate(`${baseUrl}/${username}`)
  },[ getBlockStatus, notify, navigate, isOwnerByUsername])

  return canNavigateToUser
}
